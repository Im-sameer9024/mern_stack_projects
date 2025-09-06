import { useGetProductsByCategoryQuery } from "../redux/apiSlices/productApiSlice";
import { useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import ProductsSkeleton from "../components/common/skeleton/ProductsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { categoryId, categoryName } = useParams();


 

  const { data, isLoading,isError, error } =
    useGetProductsByCategoryQuery(categoryId);



  if (isError) {
    return (
      <section className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8">
        <Skeleton className="h-8 w-40" />
        <div className="text-red-500 p-4 bg-red-100 rounded-lg border border-red-200">
          Error loading categories:{" "}
          {error?.data?.message || error?.message || "Unknown error"}
        </div>
      </section>
    );
  }

  return (
    <section  className=" lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full ">
      <h2 className=" text-[2rem] font-content mb-6 capitalize font-semibold">
        {categoryName} Category
      </h2>
      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <>
          {data?.products?.length === 0 && (
            <div className="text-red-500 p-4 w-full  bg-red-100 rounded-lg border  border-red-200">
              No products found in this category
            </div>
          )}
          <div className=" grid grid-cols-5 gap-4 w-full">
            {data?.products.map((product) => (
              <ProductCard key={product._id} singleProduct={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CategoryPage;
