import { Link, Outlet } from "react-router-dom";

export default function HomeLayout({}: {}) {
  return (
    <div className="flex  flex-col ">
      <div className="flex justify-between px-10">
        <div>
          <ul className="flex gap-2 justify-center">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"#"}>Contact</Link>
            </li>
            <li>
              <Link to={"#"}>Transfer</Link>
            </li>

            <li>
              <Link to={"#"}>Payment Collection</Link>
            </li>
          </ul>
        </div>

        <Link to={"/dashboard"}>Dashboard</Link>
      </div>
      <Outlet />
    </div>
  );
}
