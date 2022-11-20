import React, { useState } from "react";
import Link from "next/link";
import { BsCart3, BsFillBagCheckFill } from "react-icons/BS";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/Ai";
import Head from "next/head";
import Script from "next/script";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

function Checkout({ cart, subTotal, addToCart, removeFromCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
    // setTimeout(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      address.length > 3 &&
      phone.length > 3 &&
      pincode.length > 4
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    // }, 100);
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name,
      address,
      phone,
      pincode,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    console.log(txnRes);
    let txnToken = txnRes.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="container m-auto px-10">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"></Script>
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="m-auto font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto my-2">
        <div className="px-2 w-full">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea
              onChange={handleChange}
              value={address}
              name="address"
              id="address"
              cols="30"
              rows="2"
              type="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-1">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-1">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              value={city}
              onChange={handleChange}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              value={state}
              onChange={handleChange}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <h2 className="m-auto font-semibold text-xl">
        2. Review Cart Items & Pay
      </h2>
      <div className="sideCart bg-pink-50 px-8 py-4 my-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-4 ">
                <div className="font-semibold">
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </div>
                <div className="flex items-center justify-center font-semibold w-1/3 text-center">
                  <AiFillMinusCircle
                    onClick={() => {
                      removeFromCart(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      );
                    }}
                    className="cursor-pointer text-pink-500"
                  />{" "}
                  <span className="mx-2">{cart[k].qty}</span>{" "}
                  <AiFillPlusCircle
                    onClick={() =>
                      addToCart(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      )
                    }
                    className="cursor-pointer text-pink-500"
                  />{" "}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <span className="total font-bold">Subtotal : ₹{subTotal}</span>
      </div>
      <div className="mx-2">
        <Link href="">
          <button
            disabled={disabled}
            onClick={initiatePayment}
            className="disabled:bg-pink-300 flex mx-1 font-semibold text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">
            <BsFillBagCheckFill className="m-1" />
            Pay ₹{subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Checkout;
