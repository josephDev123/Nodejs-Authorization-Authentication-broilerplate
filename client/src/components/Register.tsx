import { Form, Link, useActionData } from "react-router-dom";

export default function Register() {
  const actionData = useActionData();

  console.log(actionData);
  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4">
        <h3 className="text-center font-bold text-lg mb-5">Register</h3>
        <Form method="post" action="/register">
          <div className="flex flex-col">
            <label>Names</label>
            <input
              name="name"
              type="text"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your names"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your correct Email"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your correct password"
            />
          </div>
          <button
            type="submit"
            className="p-2 border-2 rounded-md mt-4 w-full font-semibold bg-slate-500"
          >
            Register
          </button>
        </Form>
        <p className="mt-4">
          {" "}
          Already registered,{" "}
          <Link to="/login" className="text-blue-600 font-semibold ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
