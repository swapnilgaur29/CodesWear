import React from 'react'
import Link from 'next/link'
import Product from "../models/Product"
import mongoose from 'mongoose'
const MONGO_URI = "mongodb://localhost:27017/codeswear"

const Hoodies = ({ products }) => {
  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap mx-5 md:mx-14 justify-center">
            {products.map((item) => {
              return <Link passHref={true} key={item._id} href={`/product/${item.slug}`}>
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full block shadow-lg">
                  <a class="block relative rounded overflow-hidden">
                    <a><img alt="ecommerce" class="m-auto md:mx-15 h-[30vh] md:h-[45vh]" src={item.img} /></a>
                  </a>
                  <div class="mt-4 mx-8 text-center md:text-left">
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                    <h2 class="text-black title-font text-lg font-medium">{item.title}</h2>
                    <p class="mt-1">{item.price}</p>
                    <p class="mt-1">{item.size}</p>
                  </div>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(MONGO_URI)
  }

  let products = await Product.find({ category: 'hoodies' });
  // console.log(products);
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  }

}

export default Hoodies