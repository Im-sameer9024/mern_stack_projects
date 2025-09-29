import { singleProduct } from "../../../constants/Data"
import ProductCard from "../../common/ProductCard"

const BestCollection = () => {
  return (
   <div className=" lg:space-y-18 md:space-y-12 space-y-8 lg:mt-16 md:mt-10 sm:mt-6 mt-4">

      {/*----------------------- heading section ------------------------ */}
      <div className=" font-Montserrat flex gap-2 items-center justify-center text-center">
        <h2 className=" lg:text-[2.5rem] md:text-[2rem] sm:text-[1.8rem] text-[1.4rem]">
          BEST <span className=" text-gray-400">COLLECTION</span>{" "}
        </h2>
        <hr className="w-20  border-2 rounded-2xl border-black" />
      </div>

      <ProductCard product={singleProduct}/>
    </div>
  )
}

export default BestCollection
