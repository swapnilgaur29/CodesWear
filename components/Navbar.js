import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsCart3 } from 'react-icons/BS';

const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-3'>
            <div className='logo mx-5'>
                <Image src='/logo.webp' width={256} height={48} />
            </div>
            <div className='nav'>
                <ul className='flex items-center space-x-6 font-bold md:text-md'>
                    <Link href={'/tshirts'}><a><li>Tshirts</li></a></Link>
                    <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
                    <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
                    <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
                </ul>
            </div>
            <div className='cart absolute right-0 top-5 mx-5'>
                <BsCart3 className='text-xl md:text-2xl'/>
            </div>

        </div>
    )
}

export default Navbar