import { Outlet } from "react-router-dom";

export default function HomeLayout({}: {}) {
  return (
    <div>
      <ul className="flex gap-2 justify-center">
        <li>Home</li>
        <li>Contact</li>
        <li>Service</li>
      </ul>
      <Outlet />
    </div>
  );
}
