import React, { useState } from "react";
import {
  useCreateRatingMutation,
  useGetAllRatingsQuery,
} from "../../redux/apiSlices/ratingApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import Rating from "@mui/material/Rating";
import { MdClose, MdOutlineAddComment } from "react-icons/md";
import Popup from "./Popup/Popup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const RatingAndReviewSection = ({ productId, averageRating,refetchAverageRating }) => {
  const [open, setOpen] = useState(false);

  const [CreateRating] = useCreateRatingMutation();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      review: "",
      rating: 0, // Initialize with 0 instead of null to avoid undefined
    },
  });

  const ratingValue = watch("rating");
  const reviewValue = watch("review");

  const {
    data: allRatings,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllRatingsQuery(productId);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      productId,
    };

    try {
      // Here you would typically dispatch an action to submit the rating
      // For example: dispatch(addRating({ productId, ...data }));
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await CreateRating(formData).unwrap();
      if (response?.success) {
        await refetch();
        await refetchAverageRating();
      }

      console.log("response ", response);

      // Close the popup and reset the form
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleRatingChange = (event, newValue) => {
    setValue("rating", newValue, { shouldValidate: true });
  };

  const handleClosePopup = () => {
    setOpen(false);
    reset();
  };

  if (isError) {
    return (
      <section className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8">
        <Skeleton className="h-8 w-40" />
        <div className="text-red-500 p-4 bg-red-100 rounded-lg border border-red-200">
          Error loading reviews:{" "}
          {error?.data?.message || error?.message || "Unknown error"}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <div className="border p-4 items-center rounded-lg flex flex-col gap-4 w-full">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex gap-4 w-full">
            <Skeleton className="w-14 h-14 rounded-full" />
            <div className="w-full space-y-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-700">
            Customer Reviews (
            {averageRating?.data?.totalRating > 0
              ? averageRating?.data?.totalRating
              : 0}
            )
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Rating
              name="read-only"
              value={averageRating?.data?.averageRating || 0}
              size="small"
              precision={0.1}
              readOnly
            />
            <span className="text-sm text-gray-600">
              {averageRating?.data?.averageRating?.toFixed(1) || "0.0"}
            </span>
          </div>
        </div>
        <div>
          <button
            disabled={token ? false : true}
            onClick={() => setOpen(true)}
            className="bg-green-500 py-2 text-white rounded-md hover:bg-green-600 transition-all duration-200 ease-in-out px-4 flex items-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            <MdOutlineAddComment size={22} />
            Write a Review
          </button>
        </div>
      </div>

      <Popup
        openModal={open}
        onClose={handleClosePopup}
        content={
          <div className="p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Write a Review
              </h2>
              <button
                onClick={handleClosePopup}
                className="hover:bg-slate-200 p-1 rounded-full transition-colors"
                aria-label="Close"
              >
                <MdClose size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <Rating
                  name="rating-input"
                  value={Number(ratingValue)}
                  onChange={handleRatingChange}
                  size="large"
                  precision={1}
                />
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  {...register("review", {
                    required: "Review is required",
                    minLength: {
                      value: 10,
                      message: "Review must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Review cannot exceed 500 characters",
                    },
                  })}
                  className={`border p-3 border-gray-300 rounded-md w-full mt-1 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.review ? "border-red-500" : ""
                  }`}
                  rows="4"
                  placeholder="Share your experience with this product..."
                ></textarea>
                <div className="flex justify-between mt-1">
                  {errors.review ? (
                    <p className="text-red-500 text-xs">
                      {errors.review.message}
                    </p>
                  ) : (
                    <div></div>
                  )}
                  <p className="text-xs text-gray-500">
                    {reviewValue?.length || 0}/500 characters
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 w-full py-3 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-200 font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </div>
        }
      />

      <div className="w-full border border-gray-200 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h3>
        {allRatings && allRatings.allRating?.length > 0 ? (
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {allRatings.allRating?.map((rating) => (
              <div
                key={rating._id}
                className="flex gap-4 p-4 border-b border-gray-100 last:border-0"
              >
                <img
                  src={rating.user?.image || "/default-avatar.png"}
                  alt={rating.user?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">
                      {rating.user?.name || "Anonymous User"}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Rating
                    name="read-only"
                    value={rating.rating}
                    size="small"
                    precision={0.1}
                    readOnly
                    className="my-1"
                  />
                  <p className="text-gray-700 mt-2">{rating.review}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <div className="text-lg font-medium mb-2">No reviews yet</div>
            <p className="text-sm">Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingAndReviewSection;
