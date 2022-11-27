import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
const PaytmChecksum = require('paytmchecksum');

const handler = async (req, res) => {
  // Validate Paytmchecksum
  let receive_data = JSON.parse(JSON.stringify(req.body));

  var paytmChecksum = receive_data.CHECKSUMHASH;
  delete receive_data.CHECKSUMHASH;

  var isVerifySignature = PaytmChecksum.verifySignature(receive_data, process.env.NEXT_PUBLIC_PAYTM_MKEY, paytmChecksum);
  if (!isVerifySignature) {
    res.status(500).send("Some Error Occurred");
    return
  }


  //Update Order status and Insert into Orders Table after checking Transaction status
  let order;
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "PAID", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID }
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
      { status: "PENDING", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID }
    );
  }
  //  Initiate Shipping
  // res.redirect("/", 200);
  res.redirect("/order?clearCart=1&id=" + order._id, 200);

};
export default connectDb(handler);
