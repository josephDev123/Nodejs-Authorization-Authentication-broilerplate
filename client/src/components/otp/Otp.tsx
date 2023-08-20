import { Form } from "react-router-dom";
import { useState } from "react";

export default function Otp() {
  const [pins, setPins] = useState(Array(7).fill(""));
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPin = [...pins];
    newPin[index] = e.target.value;
    setPins(newPin);
  };

  const handleOnPasteData = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData.getData("Text");
    const passwordInArray = clipboardData.slice(0, 7).split("");
    const newPins = [...pins];
    passwordInArray.map((item, i) => {
      newPins[i] = item;
    });

    setPins(newPins);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="w-[90%] md:w-1/2 lg:w-2/3 xl:w-3/4 2xl:w-3/5 flex flex-col justify-center items-center">
        <h2 className="font-extrabold text-2xl">Enter code</h2>
        <p className="mb-4">We sent a code to joseph@gmail.com</p>
        <Form action="" method="post">
          {pins.map((value, index) => (
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e, index)
              }
              onPaste={handleOnPasteData}
              key={index}
              type="text"
              maxLength={1}
              value={value}
              className="border text-center border-green-300 rounded-md p-2 mx-1 w-14 h-14 focus:outline-none focus:border-2 focus:border-green-300"
            />
          ))}
        </Form>
      </div>
    </div>
  );
}
