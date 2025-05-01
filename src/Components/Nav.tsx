import Accordian from "./Accorian"
import Share from "./Share"
import Settings from "./Settings"
import Visualize from "./Visualize"
import Correlation from "./Correlation"
import DataOver from "./DataOver"
import Report from "./Summary"
import { useState } from "react"
import Plots from "./Plots"





export default function Nav({setDatOverview , dataOverview , StatOverview , setStatOverview  , plot , setPlot} : any){




    return(
        <div className="  w-70 h-full absolute bg-neutral-900 text-md  text-white flex flex-col  items-center ">
             
            <div className="border-gray-600 rounded-lg p-2 mt-4 cursor-pointer text-2xl  mb-3 w-3/4">EDA-<span className="text-blue-500 hover:text-blue-700">X</span></div>
            <div className="hover:bg-gray-700 border-gray-600 rounded-lg p-2 mt-15 cursor-pointer flex items-center  mb-4 w-3/4 hover:text-gray-300" onClick={()=>{
                 
                setDatOverview(!dataOverview)
                console.log(dataOverview)
                }}><DataOver/> Data Overview</div>


            <div className="hover:bg-gray-700 border-gray-600 rounded-lg p-2 cursor-pointer flex items-center  mb-3 w-3/4 hover:text-gray-300" onClick={()=>{
                setStatOverview(!StatOverview)
                console.log("sstat",StatOverview)
            }}><Report/>  Statistics Summary</div>
            <div className="hover:bg-gray-700 border-gray-600 rounded-lg p-2 w-3/4 cursor-pointer flex items-center   mb-4 hover:text-gray-300" onClick={()=>{setPlot(!plot)}}><Visualize/> Visualization</div>
            <div className="hover:bg-gray-700 border-gray-600 rounded-lg p-2  cursor-pointer flex items-center  mb-4 w-3/4 hover:text-gray-300"><Correlation/> Correlation </div>

            <div className="hover:bg-gray-700 border-gray-600 rounded-lg p-2 w-3/4 cursor-pointer flex items-center  mb-4 "><Accordian title="Settings" content="Dark mode" icon={<Settings/>}/></div>

            <div className="flex items-center justify-center border-gray-600 rounded-4xl border-1 p-2 w-25 cursor-pointer bottom-5 absolute left-5 hover:border-blue-500 hover:text-blue-400     mb-2">
             

               
               <span>Share</span>
               <Share></Share>


            
            </div>


           




        </div>
    )
}

