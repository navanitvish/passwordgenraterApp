import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllwed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hooks
  const PasswordRef = useRef(null)

  const passwordGenrater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllwed) str += "!@#$%^&*_-+=[]{}<,>.~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllwed, setPassword]);
   
  const copyPassword = useCallback(() =>{
    // when we are copy the password the show the copy highlights
    PasswordRef.current?.select();
    // in useRef to use to copy range of Password like 0 to 4 , 0 to 8 ,0 to 20
    //PasswordRef.current?.setSelectionRange(0,8);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenrater()

  },[length,numberAllowed, charAllwed,passwordGenrater])
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">
        Password Genrater App
      </h1>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 p-6 bg-gray-800">
        <div className="flex  shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={PasswordRef}
          />
          <button onClick={copyPassword} className=" bg-blue-600 py-0.5 shrink-0 text-white px-3 ">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={100} value={length}
            className=" cursor-pointer" onChange={(e)=>{setLength(e.target.value)}} />
            <label htmlFor="">Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed}
            id="numberInput"
            className=" cursor-pointer" onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllwed}
            id="characterInput"
            className=" cursor-pointer" onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
