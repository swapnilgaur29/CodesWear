import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  // Validate Paytmchecksum
  // Insert into Orders Table after checking Transaction status
  if (req.body.status == "TXN_SUCCESS") {
    await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "PAID", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.status == "PENDING") {
    await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "PENDING", paymentInfo: JSON.stringify(req.body) }
    );
  }
  res.redirect("/order", 200);

  //  Initiate Shipping
};
export default connectDb(handler);
