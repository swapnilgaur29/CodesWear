import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "../models/Order";

const MyOrder = ({ order, clearCart }) => {
  const router = useRouter();
  const products = order.products;
  const [date, setdate] = useState();


  useEffect(() => {
    const d = new Date(order.createdAt)
    setdate(d)
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);


  return (
    <section className="text-gray-600 body-font overflow-hidden min-h-screen ">
      <div className="container px-5 py-20 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CODESWEAR.COM
            </h2>
            <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-4">
              Order Id: #{order.orderId}
            </h1>
            <p className="leading-relaxed mb-0">
              Yay! Order Has Been Successfully Placed.
            </p>
            <p className="leading-relaxed mb-2">
              Order Placed on: {date && date.toLocaleString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <span className="leading-relaxed mb-4 font-semibold">
              Your Payment Status is: {order.status}
            </span>
            <div className="flex mb-4">
              <a className="flex-grow text-left border-pink-500 py-2 text-lg px-1">
                Item Description
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                Quantity
              </a>
              <a className="flex-grow text-right border-gray-300 py-2 text-lg px-1">
                Price
              </a>
            </div>
            {Object.keys(products).map((key) => {
              return (
                <div key={key} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">
                    {products[key].name} {products[key].size}/
                    {products[key].variant}
                  </span>
                  <span className="ml-auto text-gray-900">
                    {products[key].qty}
                  </span>
                  <span className="ml-auto text-justify text-gray-900">
                    ???{products[key].price} X {products[key].qty} = ???
                    {products[key].price * products[key].qty}
                  </span>
                </div>
              );
            })}

            <div className="flex">
              <span className="my-3 title-font font-medium text-xl md:text-2xl text-gray-900">
                Subtotal: ???{order.amount}
              </span>
            </div>
            <div className="my-3">
              <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-54 object-cover object-center rounded "
            src="order.png"
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
