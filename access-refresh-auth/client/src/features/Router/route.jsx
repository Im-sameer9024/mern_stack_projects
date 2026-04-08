import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LoginPage from "../Auth/components/LoginPage";
import SignupPage from "../Auth/components/SignupPage";
import ProfilePage from "../Auth/components/ProfilePage";
import PublicRouter from "../Auth/components/PublicRouter";
import PrivateRoute from "../Auth/components/PrivateRoute";

export const route = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRouter>
            <SignupPage />
          </PublicRouter>
        ),
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
