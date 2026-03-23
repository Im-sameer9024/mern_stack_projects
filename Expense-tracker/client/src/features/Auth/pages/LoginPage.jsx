import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

const LoginPage = () => {
  return (
    <>
      <LoginForm />

      <p className=" text-center text-sm mt-2">
        Don't have an Account ?{" "}
        <Link to={"/signup"} className="text-blue-400 hover:underline">
          Signup
        </Link>{" "}
      </p>
    </>
  );
};

export default LoginPage;
