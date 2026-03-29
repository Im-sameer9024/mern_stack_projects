import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <>
      <SignupForm />
      <p className=" text-center text-sm mt-2">
        Already have an Account ?
        <Link to={'/login'} className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </>
  );
};

export default SignupPage;
