import React from 'react';
import SignupImg from '/Images/signup.webp';
import FrameImg from '/Images/frame.webp';
import SignupForm from '../components/SignupForm';
import HighlightText from '@/features/Home/components/HightLightText';

const SignupPage = () => {
  return (
    <section className="min-h-screen flex items-center text-white mt-20 pb-20">
      <div className="w-11/12 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/*-------------------- LEFT SIDE --------------------- */}
        <div className="w-full max-w-md mx-auto lg:mx-0 space-y-6">
          {/*-------------------- Heading------------------------- */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
              Join the millions learning to code with StudyNotion for free
            </h2>

            <p className="text-richBlack-200 mt-2 text-sm sm:text-base leading-relaxed">
              Build skills for today, tomorrow, and beyond
              <HighlightText txt="Education to future-proof your career." />
            </p>
          </div>

          {/*--------------------------- Signup Form---------------------------  */}
          <SignupForm />
        </div>

        {/*------------------------ RIGHT SIDE---------------------- */}
        <div className="relative hidden lg:flex justify-center items-center">
          <img
            src={FrameImg}
            alt="pattern"
            className="absolute -bottom-4 left-6 w-[90%] max-w-md opacity-60"
          />

          <img
            src={SignupImg}
            alt="signup"
            className="relative z-10 rounded-md shadow-lg w-[90%] max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
