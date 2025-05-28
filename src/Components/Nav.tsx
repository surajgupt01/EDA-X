import Accordian from "./Accorian"
import Share from "./Share"
import Settings from "./Settings"
import Visualize from "./Visualize"
import Correlation from "./Correlation"
import DataOver from "./DataOver"
import Report from "./Summary"
import { useNavigate } from "react-router"
import LogoutButton from "./Signout"




export default function Nav({setDatOverview , dataOverview , StatOverview , setStatOverview  , plot , setPlot , setCorr } : any){

    const navigate = useNavigate()

    return(
        <div className="  w-70 h-full absolute bg-neutral-100 dark:bg-neutral-900 text-md  dark:text-white text-black flex flex-col  items-center rounded-tr-4xl rounded-br-4xl shadow-xs dark:shadow-neutral-700 shadow-neutral-400 duration-300 ease-in-out">
             
            <div className="border-gray-600 rounded-lg p-2 mt-4 cursor-pointer text-2xl  mb-3 w-3/4" onClick={()=>{navigate('/')}}>EDA-<span className="text-blue-500 hover:text-blue-700">X</span></div>
            <div className="dark:hover:bg-gray-700 hover:bg-gray-300 border-gray-600 rounded-lg p-2 mt-15 cursor-pointer flex items-center  mb-4 w-3/4 hover:text-gray-700 dark:hover:text-gray-100" onClick={()=>{
                 
                setDatOverview(!dataOverview)
                
                }}><DataOver/> Data Overview</div>


            <div className="dark:hover:bg-gray-700 hover:bg-gray-300  border-gray-600 rounded-lg p-2 cursor-pointer flex items-center  mb-3 w-3/4 hover:text-gray-700 dark:hover:text-gray-100" onClick={()=>{
                setStatOverview(!StatOverview)
                console.log("sstat",StatOverview)
            }}><Report/>  Statistics Summary</div>
            <div className=" dark:hover:bg-gray-700 hover:bg-gray-300 border-gray-600 rounded-lg p-2 w-3/4 cursor-pointer flex items-center   mb-4 hover:text-gray-700 dark:hover:text-gray-100" onClick={()=>{setPlot(!plot)}}><Visualize/> Visualization</div>
            <div className="dark:hover:bg-gray-700 hover:bg-gray-300 border-gray-600 rounded-lg p-2  cursor-pointer flex items-center  mb-4 w-3/4 hover:text-gray-700 dark:hover:text-gray-100" onClick={()=>{setCorr((e:boolean)=>!e)}}><Correlation/> Correlation </div>

            <div className="dark:hover:bg-gray-700 hover:bg-gray-300 border-gray-600 rounded-lg p-2 w-3/4 cursor-pointer flex items-center  mb-4  dark:hover:text-gray-100  "><Accordian title="Settings" content="mode" icon={<Settings/>}/></div>

            <div className="flex items-center justify-center border-gray-600 rounded-4xl border-1 p-2 w-25 cursor-pointer bottom-18 absolute left-5 hover:border-blue-500 hover:text-blue-400     mb-2"  >
             

               
               <span>Share</span>
               <Share></Share>


            
            </div>  

             <div className="flex items-center justify-center text-sm border-gray-600 rounded-4xl border-1 p-2 w-15 cursor-pointer bottom-5 absolute left-5  hover:border-red-500 hover:text-red-400     mb-2"  >
             

               
               
               <LogoutButton></LogoutButton>


            
            </div>  




           




        </div>
    )
}

