import { useState , useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  
  // useref hook
  const passwordref=useRef(null);
  const copypassword=useCallback(()=>{
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,5);
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="@$#_-"

    for (let i=0; i<=length; i++){
      let char= Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
     <div className='box'>
      <h2>password generator</h2>
      <div className="inputfield">
          <input
          className='inputbox'
          type="text" 
          value={password} 
          placeholder='password' 
          ref={passwordref}
          readOnly/>
      
      <button className='copyButton' onClick={copypassword}>COPY</button>
     </div>
        <div className="bottonLayer">

          <div className="range">
            <input 
            type="range" 
            min={6}
            max={15}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}/>
            <label>Length: {length}</label>
          </div> 
          
          <div className="checkBox">
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            id="numberInput" 
            onChange={()=>{
              setNumberAllowed((prev)=> !prev);
            }}/>
            <label>Numbers</label>
          </div>

          <div className="checkBox2">
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id="charInput" 
            onChange={()=>{
              setCharAllowed((prev)=> !prev);
            }}/>
            <label>Characters</label>
          </div>
          
        </div> 
    </div>
    </>
  )
}

export default App