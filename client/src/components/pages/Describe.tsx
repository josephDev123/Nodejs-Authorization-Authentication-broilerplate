export default function Describe() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4">
        <h2 className="font-bold text-lg mb-2">Describe yourself</h2>
        <textarea
          placeholder="Describe yourself"
          cols={4}
          className=" p-2 rounded-md  w-full focus:outline-none border-2 focus:border-customGreen"
        ></textarea>
      </div>
    </div>
  );
}
