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

  const { data: LoginUserData, error,isLoading } = useGetLoginUserQuery(undefined, {
    skip: !!user, // Skip if we already have user data
  });

  useEffect(() => {
    if (LoginUserData?.success && LoginUserData?.user) {
      dispatch(setToken("authenticated"));
      dispatch(setUser(LoginUserData?.user));
    }else if(LoginUserData && !LoginUserData?.success){
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  }, [LoginUserData, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  }, [error, dispatch]);

  return { token, user,isLoading,isAuthenticated: !!token  && !!user};
};

export default useLoginUser;
