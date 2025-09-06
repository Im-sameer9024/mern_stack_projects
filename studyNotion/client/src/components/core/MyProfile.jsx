import { Delete, DeleteIcon, Edit, Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[100vh] my-10 lg:mt-0 mt-16 px-4 sm:px-6">
      <div className="w-full md:w-10/12 lg:w-8/12 mx-auto flex flex-col gap-6 text-white font-inter h-full my-6 p-4">
        <h2 className="text-2xl font-bold">My Profile</h2>

        {/*------------ section-1 ------------- */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 px-4 py-6 rounded-md border border-richblack-700 bg-richblack-800">
          {/*--------- left side section ----------- */}
          <div className="flex gap-4 items-center">
            <div>
              {user?.image ? (
                <img
                  src={user?.image}
                  alt="userIcon"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                />
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </div>

            {/*------------- name and email------------  */}
            <div>
              <h3 className="text-lg sm:text-xl">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-sm text-richblack-200">{user?.email}</p>
            </div>
          </div>

          {/*-------------- Right side section -------------------- */}
          <div className="flex justify-end sm:justify-normal">
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 font-inter hover:bg-yellow-300 transition-all duration-200 hover:scale-95 flex items-center gap-2 w-fit h-fit"
            >
              Edit
              <Edit size={16} />
            </button>
          </div>
        </div>

        {/*------------ section-2 ------------- */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 px-4 py-6 rounded-md border border-richblack-700 bg-richblack-800">
          {/*--------- left side section ----------- */}
          <div className="flex flex-col items-start gap-2 sm:gap-4">
            <h3 className="text-lg sm:text-xl">About</h3>
            <p className="text-sm text-richblack-200">
              {user?.additionalDetails ? (
                user?.additionalDetails?.about
              ) : (
                <span>Write Something About Yourself...</span>
              )}
            </p>
          </div>

          {/*-------------- Right side section -------------------- */}
          <div className="flex justify-end sm:justify-normal">
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 font-inter hover:bg-yellow-300 transition-all duration-200 hover:scale-95 flex items-center gap-2 w-fit h-fit"
            >
              Edit
              <Edit size={16} />
            </button>
          </div>
        </div>

        {/*------------ section-3 Personal Info ------------- */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 px-4 py-6 rounded-md border border-richblack-700 bg-richblack-800">
          {/*--------- left side section ----------- */}
          <div className="flex flex-col items-start gap-4 w-full">
            <h3 className="text-lg sm:text-xl">Personal Details</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 w-full">
              {/* name  */}
              <div>
                <h3>Full Name</h3>
                <p className="text-sm text-richblack-200">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              {/* email  */}
              <div>
                <h3>Email</h3>
                <p className="text-sm text-richblack-200">{user?.email}</p>
              </div>

              {/* phone  */}
              <div>
                <h3>Phone no.</h3>
                <p className="text-sm text-richblack-200">
                  {user?.additionalDetails ? (
                    user?.additionalDetails?.contactNumber
                  ) : (
                    <span>Add Phone</span>
                  )}
                </p>
              </div>

              {/* Gender  */}
              <div>
                <h3>Gender</h3>
                <p className="text-sm text-richblack-200">
                  {user?.additionalDetails ? (
                    user?.additionalDetails.gender
                  ) : (
                    <span>Add Gender</span>
                  )}
                </p>
              </div>

              {/* DOB  */}
              <div>
                <h3>Date of Birth</h3>
                <p className="text-sm text-richblack-200">
                  {user?.additionalDetails ? (
                    user?.additionalDetails.dateOfBirth
                  ) : (
                    <span>Add Gender</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/*-------------- Right side section -------------------- */}
          <div
            onClick={() => navigate("/dashboard/settings")}
            className="flex justify-end sm:justify-normal"
          >
            <button className="bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 font-inter hover:bg-yellow-300 transition-all duration-200 hover:scale-95 flex items-center gap-2 w-fit h-fit">
              Edit
              <Edit size={16} />
            </button>
          </div>
        </div>

        {/*------------ section-3 Personal Info ------------- */}
        <div className="flex gap-4 px-4 py-6 rounded-md border border-richblack-700 bg-red-200/30 !backdrop-blur-xl ">
          <div className=" bg-red-200/40 backdrop-blur-3xl shadow-md p-2 rounded-full w-fit h-fit">
            <MdDelete size={24} />
          </div>
          <div className=" flex flex-col gap-2">
            <h3>Delete Account</h3>
            <p className=" text-sm font-light text-red-5">
              Would you like to delete account ?
            </p>
            <p className=" text-sm font-light text-red-5">
              This account may contain paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
            <p className=" text-red-50 hover:underline hover:cursor-pointer">
              i want to delete my account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
