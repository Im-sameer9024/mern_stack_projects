import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthApiOperations } from '../operations/authApiOperations';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../userSlice';
import { logout, setToken } from '../authSlice';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';
import queryClient from '@/utils/reactQuery';
import { persistor } from '@/store/store';

//--------------------- send otp api -----------------------------
export const useSendOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthApiOperations.SendOtp,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/verify-email');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useSendOtp api ', error);
    },
  });
};

//----------------------- signup api------------------------------
export const useSignupUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApiOperations.SignupUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/login');
      dispatch(clearUserData());
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useSignupUser api ', error);
    },
  });
};

//------------------------- login api ---------------------------------

export const useLoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthApiOperations.LoginUser,
    onSuccess: (data) => {
      dispatch(setToken(data.data?.accessToken));
      toast.success(data.message || 'Login Successfully');
      navigate('/dashboard/my-profile');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useLoginUser api ', error);
    },
  });
};

//---------------------------- user contact api -----------------------------------

export const useGetInTouch = () => {
  return useMutation({
    mutationFn: AuthApiOperations.GetInTouch,
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useGetInTouch api ', error);
    },
  });
};

//------------------------------- user Logout api ----------------------------------

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthApiOperations.LogoutUser,
    onSuccess: (data) => {
      toast.success(data.message);

      dispatch(logout());
      dispatch(clearUserData());

      persistor.purge();
      queryClient.removeQueries();

      navigate('/login');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useLogoutUser api ', error);
    },
  });
};

export const useResetPasswordToken = () => {
  return useMutation({
    mutationFn: AuthApiOperations.ResetPasswordToken,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useResetPasswordToken api ', error);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: AuthApiOperations.ResetPassword,
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log('Error in useResetPassword api ', error);
    },
  });
};
