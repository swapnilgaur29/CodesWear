import React from 'react'
import Link from 'next/link'
import { BsCart3, BsFillBagCheckFill } from 'react-icons/BS';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/Ai';


const Checkout = ({ cart, subTotal, addToCart, removeFromCart, }) => {
  return (
    <div className='container m-auto px-10'>
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className='m-auto font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto my-2">
        <div className="px-2 w-full">
          <div class=" mb-4">
            <label htmlFor="email" class="leading-7 text-sm text-gray-600">Address</label>
            <textarea name="address" id="address" cols="30" rows="2" type="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </textarea>
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-1">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="phone" class="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="city" class="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-1">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="state" class="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="pincode" class="leading-7 text-sm text-gray-600">PinCode</label>
            <input type="text" id="pincode" name="pincode" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='m-auto font-semibold text-xl'>2. Review Cart Items & Pay</h2>
      <div className="sideCart bg-pink-50 px-8 py-4 my-2">

        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 &&
            <div className='my-4'>
              Your Cart is Empty!
            </div>
          }
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-4 ">
                <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-center'>
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /> <span className='mx-2'>{cart[k].qty}</span> <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-pink-500' /> </div>
              </div>
            </li>
          })}
        </ol>
        <span className="total font-bold">Subtotal : ₹{subTotal}</span>
      </div>
      <div className="mx-2">
        <Link href={'/order'}><button className="flex mx-1 font-semibold text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default Checkout