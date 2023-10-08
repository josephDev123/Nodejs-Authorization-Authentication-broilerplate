import { useState } from "react";
import { Outlet } from "react-router-dom";
import { STATUS } from "../../../utils/request_status";

export default function DashboardLayout() {
  const [status, setStatus] = useState(STATUS.IDLE);
  // check whether the user have set username, otp authenticated or describe him/herself

  return (
    <div className="flex flex-col items-center gap-4 justify-center ">
      <h2>Header</h2>
      <Outlet />
      <h2>Footer</h2>
    </div>
  );
}
