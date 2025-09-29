import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetProductsByCategoryQuery,
} from "../redux/apiSlices/productApiSlice";
import {
  useCheckUserReviewedQuery,
  useGetAverageRatingQuery,
} from "../redux/apiSlices/ratingApiSlice";
import { Loader2 } from "lucide-react";
import Rating from "@mui/material/Rating";
import ProductCard from "../components/common/ProductCard";
import ProductsSkeleton from "../components/common/skeleton/ProductsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import RatingAndReviewSection from "../components/common/RatingAndReviewSection";
import { useAddToCartMutation, useGetCartDetailsQuery } from "../redux/apiSlices/cartApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const SingleProductPage = () => {
  const [index, setIndex] = useState(0);
  const { productId } = useParams();
  const{token} = useSelector((state)=>state.auth)
  const navigate = useNavigate()

  //--------------- add to cart -------------------

  const [AddToCart] = useAddToCartMutation();
  const { refetch } = useGetCartDetailsQuery();

   const handleAddToCart = async (productId, quantity = 1) => {
  
      if(!token){
        toast.error("Please login to add product to cart");
        return;
      }
  
      try {
        const response = await AddToCart({ productId, quantity }).unwrap();
        console.log("response ", response);
  
        if (response?.result?.success) {
          refetch();
          toast.success(response.result?.message);
        } else {
          toast.error(response.result?.message);
        }
      } catch (error) {
        console.log("error ", error);
      }
    };

    const handleToBuy = async() =>{
      if(!token){
        toast.error("Please login to buy product");
        return;
      }
      await handleAddToCart(productId);
      navigate("/cart")
    }

  //---------------------single Product Details api ----------------------
  const { data: singleProduct, isLoading: productLoading } =
    useGetProductQuery(productId);

  // console.log("singleProduct", singleProduct);

  //----------------------Products by category api ---------------------

  // skip the rest api by the rtk query cache if the Id is not available till

  const shouldBeSkip =
    singleProduct?.productDetails?.category?._id === undefined;

  const { data: productsByCategory, isLoading: productByCategoryLoading } =
    useGetProductsByCategoryQuery(
      singleProduct?.productDetails?.category?._id,
      { skip: shouldBeSkip }
    );

  //----------------------Rating and Review api based on single Product ---------------------

  const {
    data: RatingAndReview,
    isLoading: ratingLoading,
    refetch: refetchAverageRating,
  } = useGetAverageRatingQuery(productId);

  const { data: reviewData } = useCheckUserReviewedQuery(productId);

  // console.log("reviewData", reviewData);

  return (
    <section className="  mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full flex flex-col gap-8 font-content">
      {productLoading ? (
        <Skeleton className=" h-40 w-full rounded-md" />
      ) : (
        <div className=" flex justify-between ">
          {/*-------------------- left side section ----------------------------- */}
          <div className=" w-5/12 flex items-center gap-4 h-[400px]">
            <div className=" flex flex-col justify-between w-2/12 h-full">
              {singleProduct?.productDetails?.images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className="border rounded-md cursor-pointer  "
                >
                  <img key={i} src={image} alt="image" />
                </div>
              ))}
            </div>
            <div className=" border w-9/12 h-full rounded-md ">
              <img
                src={singleProduct?.productDetails?.images[index]}
                alt="img"
                className=" h-full w-full object-cover"
              />
            </div>
          </div>

          {/*-------------------- Right side section ------------------------- */}
          <div className=" w-6/12 space-y-6 ">
            {/*------------- Name of product and quantity ----------- */}
            <h2 className=" text-[2rem] font-semibold">
              {singleProduct?.productDetails?.productName} (
              {singleProduct?.productDetails?.quantity})
            </h2>

            {/* rating  */}
            <div className="flex items-center mt-1">
              {ratingLoading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
              ) : (
                <div className=" inline-flex !items-center">
                  <Rating
                    name="read-only"
                    value={RatingAndReview?.data?.averageRating}
                    size="small"
                    readOnly
                  />
                  <span className="text-xs text-gray-600 ml-1">
                    ({RatingAndReview?.data?.totalRating || 0})
                  </span>
                </div>
              )}
            </div>

            {/* price  */}
            <div className=" flex flex-col leading-tight ">
              <span> MRP: ₹{singleProduct?.productDetails?.price}</span>
              <span className=" text-xs text-gray-500">
                (inclusive of all taxes)
              </span>
            </div>

            {/* about the product  */}
            <div>
              <h2>About Product</h2>
              <ul className=" list-disc list-inside">
                {singleProduct?.productDetails?.about
                  .split(",")
                  .map((item, i) => (
                    <li key={i} className="text-xs text-gray-500">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>

            {/* buttons for buy and add to cart  */}
            <div className=" flex items-center justify-between gap-4">
              <button onClick={handleAddToCart} className=" bg-gray-400 w-full py-2 text-white rounded-md hover:bg-gray-500 hover:scale-95 transition-all duration-200 ease-in-out">
                Add To Cart
              </button>
              <button onClick={handleToBuy} className=" bg-green-400 w-full py-2 text-white rounded-md hover:bg-green-500 hover:scale-95 transition-all duration-200 ease-in-out">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" mt-10">
        <h2 className=" text-[2rem] font-semibold mb-2 text-center">
          Related Products
        </h2>
        <hr className=" mx-auto w-20 border-2 " />
        <div className=" mt-10  mx-auto">
          {productByCategoryLoading ? (
            <ProductsSkeleton />
          ) : (
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-4">
              {productsByCategory?.products.map((product) => (
                <ProductCard key={product._id} singleProduct={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/*--------------------- Rating and review section ---------------- */}

      <div>
        <RatingAndReviewSection
          productId={productId}
          averageRating={RatingAndReview}
          refetchAverageRating={refetchAverageRating}
          reviewData={reviewData}
        />
      </div>
    </section>
  );
};

export default SingleProductPage;
