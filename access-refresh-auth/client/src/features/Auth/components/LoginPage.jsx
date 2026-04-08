import React, { useState } from "react";
import toast from "react-hot-toast";
import { LoginUser } from "../apiOperations";
import { useAuthStore } from "../authStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setLoading, setToken } = useAuthStore();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      setLoading(true);

      const res = await LoginUser(formData);

      console.log(res);

      if (res.success) {
        toast.success(res?.message, { id: toastId });
        setToken(res.data?.accessToken);
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("error ", error);
      toast.error(error.response?.data?.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={submitHandler} className="">
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
