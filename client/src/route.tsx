import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { registerAction } from "./actions/auth/registerAction";
import { loginAction } from "./actions/auth/loginAction";
import { ConfirmOtp } from "./actions/auth/confirmOtp";
import Otp from "./pages/otp/Otp";
import ProfilePic from "./pages/Profile-pic/ProfilePic";
import SetUsername from "./pages/setUsername/SetUsername";
import Theme from "./pages/theme/Theme";
import HomeLayout from "./pages/Home/HomeLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import { verifyUserStatus } from "./actions/auth/verifyUserStatus";

export const mainroutes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,

    children: [
      {
        path: "/",
        element: "welcome",
        errorElement: "error",
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: verifyUserStatus,
    children: [
      {
        path: "/dashboard",
        element: "Dashboard Landing page",
        errorElement: "error occur in dashboard",
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: "error",
    action: registerAction,
  },
  {
    path: "/confirm-otp",
    element: <Otp />,
    errorElement: "error",
    action: ConfirmOtp,
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: "error",
    action: loginAction,
  },

  {
    path: "/set-username",
    element: <SetUsername />,
    errorElement: "error",
  },
]);
