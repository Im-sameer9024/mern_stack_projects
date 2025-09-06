import React from "react";
import { useGetLoginUserQuery } from "../redux/apiSlices/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/authSlice";
import { useEffect } from "react";

const useLoginUser = () => {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  // Only fetch if we have a token but no user data
  // const shouldSkip = !token

  const { data: LoginUserData, isError } = useGetLoginUserQuery();

  useEffect(() => {
    if (LoginUserData) {
      dispatch(setToken("authenticated"));
      dispatch(setUser(LoginUserData?.user));
    }
  }, [LoginUserData, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  }, [isError, dispatch]);

  return { token, user };
};

export default useLoginUser;
