import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Buffer } from "buffer/";
import "./App.css";

function App() {
  const [dataToManipulate, setDataToManipulate] = useState<any>();
  const [showResult, setShowResult] = useState<string>("");
  const [radioValue, setRadioValue] = useState<string>("Encode");

  const isRadioSelected = (value: string): boolean => radioValue === value;

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setRadioValue(e.currentTarget.value);

  const encodeBase64 = (data: any) => {
    let stringEncoded = Buffer.from(data).toString("base64");
    setShowResult(stringEncoded);
  };

  const decodeBase64 = (data: any) => {
    let stringDecoded = Buffer.from(data, "base64").toString("ascii");
    setShowResult(stringDecoded);
  };

  const handleResult = () => {
    return (
      dataToManipulate !== undefined &&
      dataToManipulate !== "" && <div className="card">{showResult}</div>
    );
  };

  return (
    <div className="App">
      <h1>Encode/Decode to Base64 format</h1>
      <span>Simply enter your data then push the encode/decode button.</span>
      <h2>What do you want?</h2>
      <form>
        Encode
        <input
          name="radio-encode-decode"
          value="Encode"
          onChange={handleRadioClick}
          checked={isRadioSelected("Encode")}
          type="radio"
        />
        Decode
        <input
          name="radio-encode-decode"
          value="Decode"
          onChange={handleRadioClick}
          checked={isRadioSelected("Decode")}
          type="radio"
        />
      </form>
      <div className="input-container">
        <textarea
          name="encode"
          id="encode"
          cols={30}
          rows={10}
          onChange={(event) => setDataToManipulate(event.target.value)}
        ></textarea>
        {handleResult()}
        <div className="input-button-container">
          <button
            onClick={() => {
              if (radioValue === "Encode") {
                encodeBase64(dataToManipulate);
              } else {
                decodeBase64(dataToManipulate);
              }
            }}
          >
            {radioValue}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
