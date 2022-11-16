import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart3, BsFillBagCheckFill } from "react-icons/BS";
import { MdAccountCircle } from "react-icons/md";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/Ai";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();

  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-3 sticky top-0 z-10 bg-white shadow-lg">
      <div className="logo ml-3 mr-auto md:mx-5">
        <Link href="/">
          <a>
            <Image src="/logobg.png" width={205} height={40} alt="" />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href="/tshirts">
            <a className="hover:text-pink-600">
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href="/hoodies">
            <a className="hover:text-pink-600">
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href="/stickers">
            <a className="hover:text-pink-600">
              <li>Stickers</li>
            </a>
          </Link>
          <Link href="/mugs">
            <a className="hover:text-pink-600">
              <li>Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart absolute items-center right-0 top-5 mx-5 cursor-pointer flex">
        <a onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
        {dropdown && (
          <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 top-6 bg-white border shadow-lg px-4 py-2 rounded-md w-36">
            <ul>
              <Link href={'/myaccount'}><a><li className='py-1 hover:text-pink-500 text-sm font-semibold'>My Account</li></a></Link>
              <Link href={'/orders'}><a><li className='py-1 hover:text-pink-500 text-sm font-semibold'>Orders</li></a></Link>
              <li onClick={logout} className='py-1 hover:text-pink-500 text-sm font-semibold'>Logout</li>
            </ul>
          </div>
        )}
        {user.value && (
          <MdAccountCircle
          className="text-xl md:text-2xl mx-3"  
          />
          )}
        </a>
        {!user.value && (
          <Link href="/login">
            <a>
              <button className="bg-pink-600 text-white px-2 py-1 mx-2 text-center rounded-md text-sm">
                Login
              </button>
            </a>
          </Link>
        )}
        <BsCart3 onClick={toggleCart} className="text-xl md:text-2xl" />
      </div>

      <div
        ref={ref}
        className={`sideCart overflow-y-scroll w-65 h-[100vh] z-50 absolute top-0 right-0 bg-pink-50 px-8 py-8 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl my-2 text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute right-2 top-3 text-2xl cursor-pointer text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-4 ">
                <div className="w-2/3 font-semibold">
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
        <div className="total font-bold mt-10">Subtotal : ₹{subTotal}</div>
        <div className="flex">
          <Link href="/checkout">
            <button className="flex mx-2 font-semibold mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mx-2 font-semibold mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            <AiFillDelete className="m-1" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
