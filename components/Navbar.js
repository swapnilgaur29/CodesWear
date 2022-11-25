import React, { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/router";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ["/checkout", "/order", "/orders", "/myaccount"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };

  return (
    <>
      {!sidebar && <span onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className='fixed md:right-12 right-10 md:top-5 top-3.5 z-30 cursor-pointer'>
        {dropdown && <div className='absolute right-4 bg-white shadow-lg border md:top-7 top-5 rounded-md px-5 w-32 py-4'>
          <ul>
            <Link href={"/myaccount"}><a><li className='py-1 text-sm font-bold hover:text-pink-700'>My Account</li></a></Link>
            <Link href={"/orders"}><a><li className='py-1 text-sm font-bold hover:text-pink-700'>My Orders</li></a></Link>
            <li onClick={logout} className='py-1 text-sm font-bold hover:text-pink-700'>Logout</li>
          </ul>
        </div>}
        <span   >
          {user.value && <MdAccountCircle className='text-xl md:text-3xl mx-2' />}
        </span>

      </span>}

      <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 z-10 bg-white ${!sidebar && "overflow-hidden"}`}>

        <div className='mr-auto logo  md:mt-2 md:mx-2'>
          <Link href={"/"}><a><Image src='/logo.png' alt='lg' width={230} height={55} /></a></Link>
        </div>

        <div className='nav md:mb-0 mb-1.5'>
          <ul className='flex space-x-2 font-bold md:text-md'>
            <Link href={"/tshirts"}><a><li className='hover:text-pink-600'>Tshirts</li></a></Link>
            <Link href={"/hoodies"}><a><li className='hover:text-pink-600'>Hoodies</li></a></Link>
            <Link href={"/stickers"}><a><li className='hover:text-pink-600'>Stickers</li></a></Link>
            <Link href={"/mugs"}><a><li className='hover:text-pink-600'>Mugs</li></a></Link>
          </ul>
        </div>
        <div className="flex cursor-pointer cart absolute right-0 top-3.5 md:top-5 mx-5 items-center">



          {!user.value && <Link href={"/login"}><a><button className=" text-white text-sm bg-pink-500 border-0 mx-2 px-2 py-1.5 md:py-2 focus:outline-none hover:bg-pink-600 rounded ">Login</button></a></Link>}

          <BsCart3 onClick={toggleCart} className='text-xl md:text-3xl' />
        </div>


        <div ref={ref} className={`z-10 w-72 h-screen sideCart overflow-y-scroll absolute top-0 bg-pink-100 px-8 py-10 transition-all ${sidebar ? "right-0" : "-right-96"}`}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is Empty!!</div>}

            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /></div>
                </div>
              </li>
            })}

          </ol>

          <div className='font-semibold my-3' >SubTotal: ₹{subTotal}</div>

          <div className='flex'>
            <Link href={"/checkout"}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-pink-300 flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
