import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsCart3, BsFillBagCheckFill } from 'react-icons/BS';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/Ai';

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }

    const ref = useRef();
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-3 sticky top-0 z-10 bg-white shadow-lg'>
            <div className='logo mx-5'>
                <Link href={'/'}><a><Image src='/logobg.png' width={205} height={40} alt="" /></a></Link>
            </div>
            <div className='nav'>
                <ul className='flex items-center space-x-6 font-bold md:text-md'>
                    <Link href={'/tshirts'}><a><li>Tshirts</li></a></Link>
                    <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
                    <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
                    <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
                </ul>
            </div>
            <div className='cart absolute right-0 top-5 mx-5 cursor-pointer flex'>
                <Link href={'/login'}><a><MdAccountCircle className='text-xl md:text-2xl mx-3' /></a></Link>
                <BsCart3 onClick={toggleCart} className='text-xl md:text-2xl' />
            </div>

            <div ref={ref} className={`sideCart w-65 h-[100vh] z-50 absolute top-0 right-0 bg-pink-50 px-8 py-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className='font-bold text-xl my-2 text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute right-2 top-3 text-2xl cursor-pointer text-pink-500">
                    <AiFillCloseCircle />
                </span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length === 0 &&
                        <div className='my-4'>
                            Your Cart is Empty!
                        </div>
                    }
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-4 ">
                                <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                                <div className='flex items-center justify-center font-semibold w-1/3 text-center'>
                                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /> <span className='mx-2'>{cart[k].qty}</span> <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-pink-500' /> </div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="total font-bold mt-10">Subtotal : ₹{subTotal}</div>
                <div className="flex">
                    <Link href={'/checkout'}><button className="flex mx-2 font-semibold mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                    <button onClick={clearCart} className="flex mx-2 font-semibold mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><AiFillDelete className='m-1' />Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar