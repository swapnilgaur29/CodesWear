import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  // Validate Paytmchecksum
  // Insert into Orders Table after checking Transaction status
  let order;
  console.log(JSON.stringify(req.body));
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "PAID", paymentInfo: JSON.stringify(req.body) }
    );
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "PENDING", paymentInfo: JSON.stringify(req.body) }
    );
  }
  res.redirect("/order?clearCart=1&id=" + order._id, 200);
  // res.redirect("/", 200);

  //  Initiate Shipping
};
export default connectDb(handler);
