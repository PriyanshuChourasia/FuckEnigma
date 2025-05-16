import { useState } from "react";
import InputBox from "./Components/InputBox";
import SelectBox from "./Components/SelectBox";

const App = () => {
  const [encryptText, setEncryptText] = useState("");
  const [decryptText, setDecryptText] = useState("");
  const [secretText, setSecretText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [rounds,setRounds] = useState(3);

  const specialCharacters = ["ß","Ø","à","ê","î"];

  function getSpecialChars(max,min){
    const randomVal = Math.floor(Math.random() * (max - min)) + min;
    const val = specialCharacters[randomVal];
    return val;
  }


  function getRandomChars(max,min){
    const randomVal = Math.floor(Math.random() * (max - min)) + min;
    return randomVal;
  }


  function getEncryptionRound(val){

    let chars = "";

    for(let i=0; i<val; i++){
      const newValCount = getRandomChars(122,97);
      const newChar = String.fromCharCode(newValCount);
      chars = chars + newChar;
    }
    return chars;
  }

  


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
        }else if(asciiValue < 65){
          letter = encryptSpecialChar(asciiValue);
          console.log(letter,"new letter");
        }
        newWord = newWord.concat(letter);
      }
      const specialVal = getSpecialChars(specialCharacters.length,0);
      encryptedMessage = encryptedMessage + specialVal + newWord;
    }
    const randomChars = getEncryptionRound(rounds);
    let roundEncryptedMsg = encryptedMessage + "." + randomChars;
    setSecretText(roundEncryptedMsg);


  };

    function encryptUpperCase(val) {
      const increasedVal = val + Number(rounds);
      if (increasedVal > 90) {
        return String.fromCharCode(65 + (increasedVal - 91));
      }
      return String.fromCharCode(increasedVal);
    }

    function encryptLowerCase(val) {
      const increasedVal = val + Number(rounds);
      if (increasedVal > 122) {
        return String.fromCharCode(97 + (increasedVal - 123));
      }
      return String.fromCharCode(increasedVal);
    }

    function encryptSpecialChar(val){
      const increasedVal = val + Number(rounds);
      if(increasedVal > 64){
        return String.fromCharCode(33 + (increasedVal - 65));
      }else{
        return String.fromCharCode(increasedVal);
      }
      
    }

  const onDecryptText = () => {
    if (decryptText === "") {
      alert("Please enter some text");
      return;
    }


    let decryptMessage = "";

    let roundsTextMsg = decryptText.split(".");
    let roundTextCount = roundsTextMsg[1];
    let encryptRound = roundTextCount.length;


    let newDecryptText = roundsTextMsg[0];

    let decryptReplaceText = "";
    for(let i=0; i<newDecryptText.length; i++){
      if(newDecryptText[i].includes("Ø") || newDecryptText[i].includes("à") || newDecryptText[i].includes("ê") || newDecryptText[i].includes("î")){
        decryptReplaceText = decryptReplaceText + "ß"
      }else{
        decryptReplaceText = decryptReplaceText + newDecryptText[i];
      }
    }


    const encryptMessageArray = decryptReplaceText.split("ß").filter((item) => item !== "");

      console.log(encryptMessageArray,"msg array");

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
      const decreasedVal = charValue - encryptRound;
  
      if (charValue >= 65 && charValue <= 90) {
        return decreasedVal < 65
          ? String.fromCharCode(91 - (65 - decreasedVal))
          : String.fromCharCode(decreasedVal);
      } else if (charValue >= 97 && charValue <= 122) {
        return decreasedVal < 97
          ? String.fromCharCode(123 - (97 - decreasedVal))
          : String.fromCharCode(decreasedVal);
      }else if(charValue >= 33 && charValue <= 64){
        const stringCode = 65 - (33 - decreasedVal);
        return charValue < 33 ?
          String.fromCharCode(stringCode)
          : String.fromCharCode(stringCode);
      }
      return val;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white text-gray-900">
      <h1 className="text-center font-bold text-3xl sm:text-4xl py-4 mb-12 underline">F-Enigma</h1>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full flex flex-col justify-center items-center lg:w-1/2 max-w-xl mx-auto border-2 border-gray-300 rounded py-4">
          <h2 className="font-semibold text-xl mb-2 text-center">Enter message to encrypt</h2>
          <div className="max-w-md">
              <SelectBox label={"Select rounds to encrypt"} selectedOption={rounds} setSelectedOption={setRounds} />
          </div>
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
            <div className="w-full py-4">
              <p className="mt-4 break-words text-sm sm:text-base text-center">{secretText}</p>
            </div>
            :
            ""
          }

        </div>

        <div className="w-full lg:w-1/2 max-w-xl mx-auto border-2 border-gray-300 rounded py-4">
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
            <div className="w-full py-4">
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
