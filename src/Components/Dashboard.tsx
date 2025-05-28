import UploadIcon from "./UploadIcon";
import { useState , useRef } from "react";
import axios from 'axios'
import parse from 'html-react-parser'
import React from "react";
import Send from "./send";
import { useMutation } from "@tanstack/react-query";



export default function DashBoard(){

 
    const typer = useRef<HTMLTextAreaElement>(null);
    const [type , setType] = useState(typer.current?.value);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
      

    
function handleInput(){
    setType(typer.current?.value.trim())
  }
  
  const [file , setFile] = useState<File | null>(null)
  
  const handleFileUpload = (event: any) => {
 
    setFile(event.target.files[0])
    
 
  };
  
  async function Sendprompt(formData : FormData) {
   
    if (file) {
      formData.append("file", file);
      console.log("File added:", file);
    }
  
    
    const promptText = formData.get("prompt");
    if (promptText) {
      formData.append("prompt", promptText);
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/", 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log("Response:", response.data);
      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  
  let url : any;
  const [data , setData] = useState([])
  const SendPrompt = useMutation({
  
    mutationFn : Sendprompt, onSuccess : (e:any)=>{
      
      setData(e.data)
     
      e.data.map((ele:any)=>{
        if(ele.type=='image'){
  
          const byteCharacters = atob(ele.data);
          const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/png" });
           url = URL.createObjectURL(blob);
          console.log(url.blob);
          setImageUrl(url)
  
        }
          
      })
  
     
    }
  
  })
  
  
    return(
    <>       
    
<div className="w-full absolute h-full bg-black  ">

{/*   

<div className=" border-slate-400 border-b-1 font-bold text-4xl p-3 bg-gray-black text-gray-400 cursor-pointer flex hover:text-gray-500">
  <img src="https://www.reshot.com/preview-assets/icons/SU64G82BJK/data-cleaning-SU64G82BJK.svg" className="w-10 h-10"></img>
  EDA-<span className="text-blue-500 hover:text-blue-600">X</span>
  </div>
 */}

  <div className="flex flex-col items-center absolute w-full h-[90%] text-white bg-black  p-5">

<span className="font-semibold mb-4">Welcome to EDA-X</span>


<div className="w-auto min-w-[55vw]  border-1 border-gray-700 min-h-[80%] overflow-auto scroll-smooth flex flex-col items-center p-5 mb-5 rounded-lg text-white ">
  {/* <Logo></Logo> */}
  {data && <div className="mt-0">

     {data.map((e:any , index:number)=>(

     <React.Fragment key={index}>

      {e.type == 'image' && imageUrl ?  <img src={imageUrl} className="w-130 h-100 mt-2 mb-2"></img> : null }
      {e.type!='image' && <div className="mt-2 mb-2 font-semibold text-2xl text-blue-500">{e.type}</div>}
      {e.type!='image' ? <div>{parse(e.data)}</div>
      : null}
     {index !== data.length - 1 && <br />}
     <hr></hr>
    </React.Fragment>
     ))}

     {/* <img src={data} className="w-50 h-50"></img> */}
    
  </div>}
 </div>


<form action={SendPrompt.mutate}>
  <div className=" sm:w-[90vw] w-[95vw] md:w-[50vw] bg-gray-900 shadow-md rounded-lg p-3 flex  ">
<div>

<label htmlFor='file_input' className="cursor-pointer mr-4 group" ><UploadIcon/>
<span className="bg-gray-700 text-white absolute -mt-18 ml-2 duration-300 ease-in-out rounded-md p-1 opacity-0 group-hover:opacity-100">Upload file</span>
</label> 
<input type="file" id="file_input" name="file" className="w-10 ml-2 mt-5 cursor-pointer bg-white opacity-0 hidden" onChange={handleFileUpload}></input>

</div>


<textarea
 onInputCapture={handleInput}
 name="prompt"
 ref={typer}
 className={`ml-4 bg-gray-900 w-full rounded-lg focus:outline-none p-3 border border-gray-900 focus:border-gray-900 text-white resize-none overflow-hidden ${type ? ''  :'animate-pulse'}`}
 rows={1}
 onInput={(e) => {
   const txt = e.target as HTMLTextAreaElement;
   txt.style.height = "auto"; 
   txt.style.height = `${txt.scrollHeight}px`; 
 }}
 placeholder="Enter your requirements"
></textarea>
<button type="submit"><Send></Send></button>

</div>
</form>



</div>



</div>

</>

    )
}