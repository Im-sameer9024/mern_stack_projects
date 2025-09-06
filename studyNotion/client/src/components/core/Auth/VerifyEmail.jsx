import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useSignupMutation } from "../../../redux/apislices/authApiSlice";
import { setLoading } from "../../../redux/slices/authSlice";
import { useEffect } from "react";

const VerifyEmail = () => {


  //------------- redux state and function -----------

  const [signup] = useSignupMutation();
  const { loading,signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log("signup Data in verify email",signupData)

  const navigate = useNavigate();

  useEffect(()=>{
    if(!signupData){
      navigate("/signup")
    }
  },[navigate,signupData])

  //--------------- react-hook-form validation ----------------
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      console.log("data", data);

      const finalData = {
        ...signupData, // Spread all signup data
        otp: String(data.otp), // Add the OTP from the form
      };

      console.log("Final data being sent:", finalData);

      const response = await signup(finalData).unwrap();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.data?.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-white p-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div>
            <h3 className="font-semibold text-2xl mb-2">Verify Email</h3>
            <p className="text-richblack-300 text-sm">
              A verification code has been sent to you. Enter the code below
            </p>
          </div>

          <div className="flex justify-center">
            <OtpInput
              value={otpValue}
              onChange={(value) => setValue("otp", value)}
              numInputs={6} // Changed to 6 to match your button validation
              renderSeparator={<span className="mx-1">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-12 h-12 text-center text-xl font-medium bg-richblack-700 rounded-md border border-richblack-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 "
                />
              )}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.375rem",
              }}
              containerStyle="flex items-center"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || otpValue?.length !== 6} // Added optional chaining
            className="mt-6  w-full bg-yellow-200 text-black font-semibold py-3 px-4 !rounded-md hover:bg-yellow-300 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting && loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 flex justify-between items-center">
          <Link
            to="/signup"
            className="flex items-center gap-x-2 text-richblack-300 hover:text-richblack-50 hover:underline transition-colors text-sm"
          >
            <BiArrowBack />
            Back To Signup
          </Link>
          <button
            onClick={() => console.log("Resend code")}
            className="flex items-center gap-x-2 text-blue-300 hover:text-blue-200 hover:underline transition-colors text-sm"
          >
            <FaClockRotateLeft />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
