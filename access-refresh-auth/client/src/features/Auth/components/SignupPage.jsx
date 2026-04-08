import React, { useState } from "react";
import toast from "react-hot-toast";
import { SignupUser } from "../apiOperations";
import { useAuthStore } from "../authStore";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { setLoading } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing up...");

    try {
      setLoading(true);

      const res = await SignupUser(formData);

      if (res.success) {
        toast.success(res?.message, { id: toastId });
        navigate("/login");
        setFormData({
            username: "",
            name: "",
            email: "",
            password: "",
        })
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
      <h2>Signup Page</h2>

      <form onSubmit={submitHandler} className="">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </label>

        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
