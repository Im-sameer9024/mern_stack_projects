import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <section className="flex justify-between overflow-x-auto mt-10 lg:px-8 md:px-6 px-4 py-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-2 rounded-lg justify-center items-center min-w-[150px] space-y-3"
        >
          <Skeleton className=" h-60 w-52 flex flex-col justify-center items-center gap-4 p-3">
            <Skeleton className="h-28 w-28 rounded-full" />
            <Skeleton className="h-10 w-full rounded-md" />
          </Skeleton>
        </div>
      ))}
    </section>
  );
};

export default ProductsSkeleton;
