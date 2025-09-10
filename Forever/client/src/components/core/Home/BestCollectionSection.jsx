import React from 'react'
import ProductCart from '../../common/ProductCard'

const BestCollectionSection = () => {
  return (
     <div className=" lg:space-y-18 md:space-y-12 space-y-8">
      <div className=" font-sans flex gap-2 items-center justify-center text-center">
        <h2 className=" lg:text-[2.5rem] md:text-[2rem] sm:text-[1.8rem] text-[1.4rem]">
          BEST <span className=" text-gray-400">COLLECTION</span>{" "}
        </h2>
        <hr className="w-20  border-2 rounded-2xl border-black" />
      </div>

      <ProductCart/>
    </div>
  )
}

export default BestCollectionSection
