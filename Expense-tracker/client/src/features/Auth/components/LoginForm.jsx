import CustomButton from "@/shared/components/custom/CustomButton";
import InputField from "@/shared/components/custom/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidationSchema } from "@/shared/validation/auth.validationSchema";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const OnSubmitHandler = () => {};

  return (
    <form onSubmit={handleSubmit(OnSubmitHandler)} className=" space-y-2">
      {/*-------------- Email field ------------------- */}
      <InputField
        label={"Email Address"}
        placeholder={"john123@gmail.com"}
        type={"text"}
        name={"email"}
        error={errors.email}
        loading={false}
        register={register}
      />

      {/*------------------- Password field --------------  */}

      <InputField
        label={"Password"}
        placeholder="Password"
        type={"password"}
        name={"password"}
        error={errors.password}
        loading={false}
        register={register}
      />

      <CustomButton
        fullWidth={true}
        type="submit"
        active={true}
        isLoading={false}
      >
        Log In
      </CustomButton>
    </form>
  );
};

export default LoginForm;
