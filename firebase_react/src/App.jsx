import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Signup from "./pages/Signup";

const db = getDatabase(app);

const auth = getAuth(app);

const App = () => {
  const putData = () => {
    set(ref(db, "users/sam"), {
      id: 1,
      name: "Sameer",
      age: 23,
    });
  };

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, "sameer@gmail.com", "123456").then(
      (value) => console.log(value)
    );
  };

  return (
    <div>
      <button onClick={signupUser}>Put Data</button>

      <Signup/>
    </div>
  );
};

export default App;
