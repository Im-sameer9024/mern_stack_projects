import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";


const auth = getAuth(app);

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  const data =    createUserWithEmailAndPassword(auth, formData.email, formData.password);

  console.log(data)
  };

  return (
    <div>
      <h1>Signup Form</h1>

      <form onSubmit={submitHandler}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            name="email"
            placeholder="enter Your email"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            onChange={handleOnChange}
            value={formData.password}
            name="password"
            placeholder="enter Password"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
