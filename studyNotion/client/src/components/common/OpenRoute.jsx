import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  return children;
};
export default OpenRoute;
