import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { registerAction } from "./actions/registerAction";
import { loginAction } from "./actions/loginAction";
import { ConfirmOtp } from "./actions/confirmOtp";
import Otp from "./components/pages/otp/Otp";
import ProfilePic from "./components/pages/Profile-pic/ProfilePic";
import Describe from "./components/pages/Describe";
import SetUsername from "./components/pages/setUsername/SetUsername";
import Theme from "./components/pages/theme/Theme";
import HomeLayout from "./components/pages/Home/HomeLayout";
import DashboardLayout from "./components/pages/Dashboard/DashboardLayout";
import { verifyUserStatus } from "./actions/verifyUserStatus";

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
    path: "/describe",
    element: <Describe />,
    errorElement: "error",
  },

  {
    path: "/set-username",
    element: <SetUsername />,
    errorElement: "error",
  },
]);
