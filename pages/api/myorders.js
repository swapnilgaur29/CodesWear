import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import jsonWebToken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jsonWebToken.verify(token, process.env.JWT_SECRET);
  let orders = await Order.find({ email: data.email });

  res.status(200).json({ orders });
};

export default connectDb(handler);
