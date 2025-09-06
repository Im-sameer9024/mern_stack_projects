import { Cross, CrossIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiCloset } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useAddCourseDetailsMutation } from "../../../../../redux/apislices/courseApiSlice";
import { useGetAllCategoriesQuery } from "../../../../../redux/apislices/categoryApiSlice";

const CourseInformation = ({ category }) => {
  const [instructionInput, setInstructionInput] = useState("");
  const [instructionsList, setInstructionsList] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [addCourseDetails] = useAddCourseDetailsMutation();
  const { data: Categories } = useGetAllCategoriesQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      price: "",
      category: "",
      thumbnail: null,
      benefits: "",
      instructions: [],
    },
    mode: "onChange",
  });

  // Watch all fields to trigger validation updates
  watch();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("thumbnail", e.target.files, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = (e) => {
    e.preventDefault();
    setThumbnailPreview(null);
    setValue("thumbnail", null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddInstruction = () => {
    if (instructionInput.trim()) {
      const newInstructions = [...instructionsList, instructionInput.trim()];
      setInstructionsList(newInstructions);
      setValue("instructions", newInstructions, { shouldValidate: true });
      setInstructionInput("");
    }
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructionsList.filter((_, i) => i !== index);
    setInstructionsList(newInstructions);
    setValue("instructions", newInstructions, { shouldValidate: true });
  };

  const submitHandler = async (data) => {
    let formData = {
      courseName: data?.courseTitle,
      courseDescription: data?.courseDescription,
      whatYouWillLearn: data?.benefits,
      category: data?.category,
      thumbnailImage: data?.thumbnail[0],
      price: data?.price,
      instructions: data?.instructions,
    };

    let finalData = JSON.stringify(formData);

    console.log("submit data of course Information", formData);
    const toastId = toast.loading("Adding course...");
    try {
      const response = await addCourseDetails(finalData).unwrap();

      console.log("api response of course information", response);
    } catch (error) {
      console.log("error in adding course information", error);
      toast.error("Error in adding course information");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full mt-6 gap-4 space-y-2 font-inter px-4 py-6 rounded-md border border-richblack-700 bg-richblack-800">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/*--------------- Course Title --------- */}
        <div className="space-y-1">
          <label
            htmlFor="courseTitle"
            className="text-white text-sm sm:text-base"
          >
            Course Title<sup className="text-red-500">*</sup>
          </label>
          <input
            id="courseTitle"
            type="text"
            placeholder="Enter Course Title"
            {...register("courseTitle", {
              required: "Course title is required",
            })}
            className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
          />
          {errors.courseTitle && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.courseTitle.message}
            </p>
          )}
        </div>

        {/*--------------- Short Description --------- */}
        <div className="space-y-1">
          <label
            htmlFor="courseDescription"
            className="text-white text-sm sm:text-base"
          >
            Course Short Description<sup className="text-red-500">*</sup>
          </label>
          <textarea
            id="courseDescription"
            rows={4}
            placeholder="Enter Description"
            {...register("courseDescription", {
              required: "Description is required",
            })}
            className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
          />
          {errors.courseDescription && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.courseDescription.message}
            </p>
          )}
        </div>

        {/*--------------- Price --------- */}
        <div className="space-y-1">
          <label htmlFor="price" className="text-white text-sm sm:text-base">
            Price<sup className="text-red-500">*</sup>
          </label>
          <input
            id="price"
            type="number"
            placeholder="Enter Price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          />
          {errors.price && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.price.message}
            </p>
          )}
        </div>

        {/*--------------- Category Dropdown --------- */}
        <div className="space-y-1">
          <label htmlFor="category" className="text-white text-sm sm:text-base">
            Category<sup className="text-red-500">*</sup>
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base appearance-none"
          >
            <option value="">Choose a Category</option>

            {Categories?.allCategories?.length < 1 ? (
              <option value="">No Category Available</option>
            ) : (
              Categories?.allCategories?.map((item) => (
                <option key={item._id} value={item?._id}>
                  {item?.name}
                </option>
              ))
            )}
          </select>
          {errors.category && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.category.message}
            </p>
          )}
        </div>

        {/*--------------- Tags --------- */}
        {/* <div className="space-y-1">
          <label htmlFor="tags" className="text-white text-sm sm:text-base">
            Tags<sup className="text-red-500">*</sup>
          </label>
          <select
            id="tags"
            {...register("tags", { required: "Tags are required" })}
            className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base appearance-none"
          >
            <option value="">Choose a Tag</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>
          {errors.tags && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.tags.message}
            </p>
          )}
        </div> */}

        {/*--------------- Thumbnail Upload --------- */}
        <div className="space-y-1">
          <label
            htmlFor="thumbnail"
            className="text-white text-sm sm:text-base"
          >
            Course Thumbnail<sup className="text-red-500">*</sup>
          </label>
          <div className="border-2 border-dashed border-richblack-200 rounded-md p-4 text-center">
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              className="hidden"
              onChange={handleThumbnailChange}
              ref={fileInputRef}
            />
            <label
              htmlFor="thumbnail"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              {thumbnailPreview ? (
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="max-h-48 mx-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 bg-richblack-800 rounded-full p-1 text-red-400 hover:text-red-300"
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-richblack-5 mb-2">
                    Drag and drop an image, or{" "}
                    <span className="text-yellow-50">Browse</span>
                  </p>
                  <p className="text-richblack-400 text-xs">
                    Max 6MB each (12MB for videos)
                    <br />
                    Aspect ratio: 16:9
                    <br />
                    Recommended size: 1024x576
                  </p>
                </>
              )}
            </label>
          </div>
          {errors.thumbnail && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        {/*--------------- Benefits --------- */}
        <div className="space-y-1">
          <label htmlFor="benefits" className="text-white text-sm sm:text-base">
            Benefits of the course<sup className="text-red-500">*</sup>
          </label>
          <textarea
            id="benefits"
            rows={4}
            placeholder="Enter Benefits of the course"
            {...register("benefits", { required: "Benefits are required" })}
            className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
          />
          {errors.benefits && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>
              {errors.benefits.message}
            </p>
          )}
        </div>

        {/*-------------- requirements and instructions -------------- */}

        <div className="space-y-1">
          <label
            htmlFor="instructions"
            className="text-white text-sm sm:text-base"
          >
            Requirements/Instructions<sup className="text-red-500">*</sup>
          </label>
          <div className="flex gap-2">
            <input
              id="instructions"
              value={instructionInput}
              onChange={(e) => setInstructionInput(e.target.value)}
              placeholder="Enter Requirements / Instructions"
              className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={handleAddInstruction}
              disabled={
                !instructionInput.trim() || instructionsList.length >= 5
              }
              className="bg-yellow-300 px-6 py-1 rounded-md text-black hover:bg-yellow-400 hover:scale-97 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-400 disabled:scale-100 whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* Display added instructions */}
          <div className="mt-4 space-y-2">
            {instructionsList.map((instruction, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-richblack-700 p-2 rounded-md"
              >
                <span className="flex items-center">• {instruction}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(index)}
                  className="text-red-400 text-lg hover:text-red-300"
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>

          {/* Validation for instructions */}
          {instructionsList.length === 0 && (
            <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
              <sup>*</sup>At least one instruction is required
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid && instructionsList.length === 0}
          className={`mt-4 sm:mt-6 w-full ${
            isValid && instructionsList.length > 0
              ? "bg-yellow-200 hover:bg-yellow-300 hover:scale-97"
              : "bg-richblack-600 cursor-not-allowed"
          } text-black font-semibold py-2 sm:py-3 px-4 rounded-md transition-all duration-200 text-sm sm:text-base relative`}
        >
          Save & Next
        </button>
      </form>
    </div>
  );
};

export default CourseInformation;
