import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { registerAction } from "./actions/registerAction";
import { loginAction } from "./actions/loginAction";
import Otp from "./components/pages/otp/Otp";
import ProfilePic from "./components/pages/Profile-pic/ProfilePic";
import Describe from "./components/pages/Describe";
import SetUsername from "./components/pages/setUsername/SetUsername";

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
    path: "/otp",
    element: <Otp />,
    errorElement: "error",
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
]);
