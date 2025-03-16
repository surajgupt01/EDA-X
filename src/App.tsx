import UploadIcon from "./Components/UploadIcon";
import Logo from "./Components/Logo";
import { useState , useRef } from "react";


function App() {

  const typer = useRef<HTMLTextAreaElement>(null);
  const [type , setType] = useState(typer.current?.value);



function handleInput(){
  setType(typer.current?.value.trim())
}
  


  return (
    <>



<div className="w-full absolute h-screen ">

<div className="font-bold text-4xl p-3 text-gray-700 cursor-pointer flex">
  <img src="https://www.reshot.com/preview-assets/icons/SU64G82BJK/data-cleaning-SU64G82BJK.svg" className="w-10 h-10"></img>
  EDA-X
  </div>


  <div className="flex flex-col items-center absolute w-full h-[90%]  p-5">

<span className="font-semibold mb-4">Welcome to EDA-X</span>


<div className="sm:w-[87vw] w-[97vw]  md:w-[70vw] border-1 border-gray-200 min-h-[80%] overflow-hidden  shadow-lg flex flex-col items-center p-5 mb-5 rounded-lg ">
  <Logo></Logo>
 </div>

  <div className=" sm:w-[90vw] w-[95vw] md:w-3/5 bg-gray-700 shadow-md rounded-lg p-4 flex  ">
<div>

<label htmlFor='file_input' className="cursor-pointer mr-4 group" ><UploadIcon/>
<span className="bg-black text-white absolute -mt-18 ml-2 duration-300 ease-in-out rounded-md p-1 opacity-0 group-hover:opacity-100">Upload file</span>
</label> 
<input type="file" id="file_input" className="w-10 ml-2 mt-5 cursor-pointer bg-white opacity-0 hidden"></input>

</div>


<textarea
 onInputCapture={handleInput}
 ref={typer}
 className={`ml-4 bg-gray-700 w-full rounded-lg focus:outline-none p-3 border border-gray-700 focus:border-gray-700 text-white resize-none overflow-hidden ${type ? ''  :'animate-pulse'}`}
 rows={1}
 onInput={(e) => {
   const txt = e.target as HTMLTextAreaElement;
   txt.style.height = "auto"; 
   txt.style.height = `${txt.scrollHeight}px`; 
 }}
 placeholder="Enter your requirements"
></textarea>
</div>



</div>








</div>




  
     
    </>
  )
}

export default App










 
