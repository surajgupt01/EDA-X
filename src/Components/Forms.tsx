import UploadIcon from "./UploadIcon";
import { useState , useRef, useEffect } from "react";
import axios from 'axios'
import parse from 'html-react-parser'
import React from "react";
import Send from "./send";
import { useMutation, useQuery } from "@tanstack/react-query";
import {motion} from "motion/react"
import Plots from "./Plots";
import PieC from "./Pie";
import BarG from "./BarG";




export default function Forms({dataOverview , StatOverview  , setColumns , setFileP , colData , dataset , setDataset , PlotType , piedata , setPieData} : any){

    
    const typer = useRef<HTMLTextAreaElement>(null);
    const [type , setType] = useState(typer.current?.value);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null)
      

    
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
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  

}
  

  type DataType = {
    type: string;
    data: string;
  };
  
  const [Data, setData] = useState<DataType[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const SendPrompt = useMutation({
    mutationFn: Sendprompt,
    onSuccess: (e) => {
      setData((prevData) => [...prevData, ...e]);
      
      e.forEach((ele:any) => {
        if (ele.type === 'image') {
          const byteCharacters = atob(ele.data);
          const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/png" });
          const url = URL.createObjectURL(blob);
          console.log(blob);
          setImageUrls((prev) => [...prev, url]);
        }
      });
    },
  });

  async function Doverview() {
    setFileP(file); 
  
    if (dataOverview && file) {
      try {
        const formData = new FormData();
        formData.append("file", file);  
        formData.append("prompt", ""); 
  
        const response = await axios.post(
          "http://127.0.0.1:8000/dataoverview",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Response dataover ::", response.data);
        return response.data;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }
  

  const [isOverviewFetched, setIsOverviewFetched] = useState(false);
  const Overview = useMutation({
    mutationFn : Doverview , onSuccess : (x)=>{

    x.map((ele:any)=>{

      if(ele.type=='columns'){
        
        setColumns(ele.data)
        console.log("colss",ele.data)
        
      }

    })
    
    setData((prevData) => [...prevData, ...x]);
    


    }
  })

  
  useEffect(()=>{
      if(dataOverview && !isOverviewFetched){

        Overview.mutate()
        setIsOverviewFetched(true)


      }
  },[dataOverview , isOverviewFetched])


  async function DoStat() {
    if(StatOverview){
     try {
       const response = await axios.post(
         "http://127.0.0.1:8000/Stat", 
          {"file " : file},
         {
           headers: { "Content-Type": "multipart/form-data" },
         }
       );
   
       console.log("stat ::", response.data);
       return response.data;
     } catch (error) {
       console.error("Error uploading file:", error);
     }

   }
   
 }


 const [isStatFetched, setIsStatFetched] = useState(false);
 const Stat = useMutation({
   mutationFn : DoStat , onSuccess : (x)=>{
   setData((prevData) => [...prevData, ...x]);
   


   }
 })


 useEffect(()=>{
     if(StatOverview && !isStatFetched){

       Stat.mutate()
       setIsStatFetched(true)


     }
 },[StatOverview , setIsStatFetched])




 useEffect(()=>{
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }

 },[Data])




 setPieData(dataset)


 console.log("piedd" , piedata)





   
  


    return(
        <div className="bg-zinc-950  p-4 flex flex-col justify-center items-center h-full  w-full  ">

            
            <div className=" w-[90%]  border-gray-700   min-h-[85%]   overflow-auto  scroll-smooth flex flex-col jusctify-center   mb-5 rounded-lg pb-10   " ref={scrollRef} >
              {/* <Logo></Logo> */}
              {Data && <motion.div className="p-5 text-sm " initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }}>
            
                 {Data.map((e:any , index:number)=>(
            
                 <React.Fragment key={index}>
            
                   {/* {e.type == 'image' && imageUrl ?  <img src={imageUrl} className="w-130 h-100 mt-2 mb-2"></img> : null } */}
                  {e.type!='image'&& e.type!='columns' && <div className="mt-2 mb-2 font-semibold text-3xl text-blue-500">{e.type}</div>}
                  {e.type!='image'&& e.type!='columns' ? <motion.div className="text-xs transition-transform duration-200" 
                    initial={{opacity:0}}
                    animate={{opacity:100}}
                    transition={{duration:1 , ease: "easeOut"}}
                  >{parse(e.data)}</motion.div>
                  : null}
                 {index !== Data.length - 1 && <br />}
                 <hr></hr>
                </React.Fragment>
                 ))} 

                      {piedata  && <PieC data={dataset} piedata = {piedata} setPieD = {setPieData} />} 
                      {dataset?.type === "bar" && <BarG data={dataset} />}
            
                 {/* <img src={data} className="w-50 h-50"></img>   */}
                
              </motion.div>}
             </div>

             {/* ////////////////////////////////////////////////////////// */}



             <form action={SendPrompt.mutate} className="absolute  bottom-5  ">
               <div className=" sm:w-[90vw] w-[95vw] md:w-[60vw] bg-neutral-900 shadow-sm border-1 border-gray-800 rounded-2xl h-auto p-3 flex shadow-gray-900  ">
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
              className={`ml-4 bg-neutral-900 w-full rounded-lg focus:outline-none p-3 border border-gray-900 focus:border-gray-900 text-white resize-none overflow-hidden ${type ? ''  :'animate-pulse'} `}
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
    )
}