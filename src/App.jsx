import { useState } from "react";
import InputBox from "./Components/InputBox";

const App = () => {
  const [encryptText, setEncryptText] = useState("");
  const [decryptText, setDecryptText] = useState("");
  const [secretText, setSecretText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const onEncryptText = () => {
    if (encryptText === "") {
      alert("Please enter some text");
      return;
    }

    const sentenceArray = encryptText.split(" ");
    let encryptedMessage = "";

    for (let i = 0; i < sentenceArray.length; i++) {
      const sentenceWordArray = sentenceArray[i].split("");
      let newWord = "";
      for (let j = 0; j < sentenceWordArray.length; j++) {
        const sentenceLetter = sentenceWordArray[j];
        const asciiValue = sentenceLetter.charCodeAt(0);
        let letter = "";
        if (asciiValue >= 65 && asciiValue <= 90) {
          letter = encryptUpperCase(asciiValue);
        } else if (asciiValue >= 97 && asciiValue <= 122) {
          letter = encryptLowerCase(asciiValue);
        }
        newWord = newWord.concat(letter);
      }
      encryptedMessage = encryptedMessage + "#" + newWord;
    }

    setSecretText(encryptedMessage);

    function encryptUpperCase(val) {
      const increasedVal = val + 3;
      if (increasedVal > 90) {
        return String.fromCharCode(65 + (increasedVal - 91));
      }
      return String.fromCharCode(increasedVal);
    }

    function encryptLowerCase(val) {
      const increasedVal = val + 3;
      if (increasedVal > 122) {
        return String.fromCharCode(97 + (increasedVal - 123));
      }
      return String.fromCharCode(increasedVal);
    }
  };

  const onDecryptText = () => {
    if (decryptText === "") {
      alert("Please enter some text");
      return;
    }

    let decryptMessage = "";
    const encryptMessageArray = decryptText.split("#").filter((item) => item !== "");

    for (let i = 0; i < encryptMessageArray.length; i++) {
      const decrptWord = encryptMessageArray[i];
      let word = "";
      for (let j = 0; j < decrptWord.length; j++) {
        const decryptLetter = decrptWord[j];
        word = word.concat(decryptEncryptMessage(decryptLetter));
      }
      decryptMessage = decryptMessage + " " + word;
    }

    setDecryptedText(decryptMessage);

    function decryptEncryptMessage(val) {
      const charValue = val.charCodeAt(0);
      const decreasedVal = charValue - 3;

      if (charValue >= 65 && charValue <= 90) {
        return decreasedVal < 65
          ? String.fromCharCode(91 - (65 - decreasedVal))
          : String.fromCharCode(decreasedVal);
      } else if (charValue >= 97 && charValue <= 122) {
        return decreasedVal < 97
          ? String.fromCharCode(123 - (97 - decreasedVal))
          : String.fromCharCode(decreasedVal);
      }
      return val; // fallback
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white text-gray-900">
      <h1 className="text-center font-bold text-3xl sm:text-4xl py-4 mb-12 underline">F-Enigma</h1>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full lg:w-1/2 max-w-xl mx-auto">
          <h2 className="font-semibold text-xl mb-2 text-center">Enter message to encrypt</h2>
          <InputBox
            inputText={encryptText}
            setInpuText={setEncryptText}
            placeHolder={"Enter message to encrypt"}
            label={"Encrypt"}
            name={"Encrypt"}
            onClick={onEncryptText}
          />
          {
            secretText ?       
            <div className="w-full border-2 border-gray-200 rounded py-4">
              <p className="mt-4 break-words text-sm sm:text-base text-center">{secretText}</p>
            </div>
            :
            ""
          }

        </div>

        <div className="w-full lg:w-1/2 max-w-xl mx-auto">
          <h2 className="font-semibold text-xl mb-2 text-center">Enter your secret to decrypt</h2>
          <InputBox
            inputText={decryptText}
            setInpuText={setDecryptText}
            placeHolder={"Enter encrypted message to decrypt"}
            label={"Decrypt"}
            name={"Decrypt"}
            onClick={onDecryptText}
          />
          {
            decryptedText ?       
            <div className="w-full border-2 border-gray-200 rounded py-4">
              <p className="mt-4 break-words text-sm sm:text-base text-center">{decryptedText}</p>
            </div>
            :
            ""
          }
        </div>
      </div>
    </div>
  );
};

export default App;
