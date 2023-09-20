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

export const mainroutes = createBrowserRouter([
  {
    path: "/",
    element: "welcome",
    errorElement: "error",
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: "error",
    action: loginAction,
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
    path: "/profile-pic",
    element: <ProfilePic />,
    errorElement: "error",
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

  {
    path: "/set-theme",
    element: <Theme />,
    errorElement: "error",
  },
]);
