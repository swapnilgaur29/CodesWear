import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../models/Product";

function Tshirts({ products }) {
  console.log(products);
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-5 md:mx-14 justify-center">
            {Object.keys(products).map((item) => (
              <Link
                passHref
                key={products[item]._id}
                href={`/product/${products[item].slug}`}>
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full block shadow-lg">
                  <a className="block relative rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-15 h-[30vh] md:h-[42vh] "
                      src={products[item].img}
                    />
                  </a>
                  <div className="mt-4 mx-8 text-center md:text-left ">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Tshirts
                    </h3>
                    <h2 className="text-black title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border border-black px-1 mx-1">
                          S{" "}
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border border-black px-1 mx-1">
                          M{" "}
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border border-black px-1 mx-1">
                          L{" "}
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("red") && (
                        <button className="border-2 border-red-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("black") && (
                        <button className="border-2 border-black-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("green") && (
                        <button className="border-2 border-green-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("blue") && (
                        <button className="border-2 border-blue-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("yellow") && (
                        <button className="border-2 border-yellow-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("white") && (
                        <button className="border-2 border-white-300 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const products = await Product.find({ category: "tshirt" });
  console.log(products);
  const tshirts = {};
  for (const item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }
  // console.log(products);
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}

export default Tshirts;
