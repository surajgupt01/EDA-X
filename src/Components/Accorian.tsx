import {useTheme} from '../Context/ThemeContext'
import {  useState } from "react"
import Dark from "./dark";
import Light from "./light";

type AccordionProps = {
    title: string;
    content: string; 
    icon : any
  };

  

export default function Accordian({title    , icon  } : AccordionProps){

    const [open , setOpen] = useState(false)

    const  {theme , toggleTheme} = useTheme()
    function handleAccord()
    {
        setOpen(!open)

    }

    return(

        <div className="flex flex-col text-white">

            <div className="flex items-center ">
              
              <div>{icon}</div>
              <button onClick={handleAccord} className={`cursor-pointer transition-transform duration-300 ease-in-out text-black  dark:text-white  ${open? ' text-red-500' : ''} `}>{title}</button>




            </div>
            {open && <div
             
             className={ `flex items-center justify-center ml-8 hover:text-gray-400 text-left transition text-sm  duration-300 ease-in-out ${open ? 'max-h-10 opacity-100 ' : 'max-h-0 opacity-0 '} cursor-pointer scale-85`} 
            onClick={()=>{
                 
            }}>  
            <label htmlFor='togg' className='dark:text-white text-gray-900 text-sm cursor-pointer'> Dark Mode </label> 

                <div className='bg-black flex rounded-full p-1 items-center scale-90 '>
                <button id='togg' className={`relative border bg-gray-200 rounded-full  mr-1 cursor-pointer border-gray-200 items-center justify-center  overflow-hidden h-8 w-8 scale-75 transform duration-300 ease-in-out ${theme ? 'translate-x-8 ml-1' : ''}   `} 
                                   onClick={()=>{
                                        toggleTheme(!theme)
                                    }}><Light/> <Dark/></button>

                    <label htmlFor='togg' className={`cursor-pointer text-xs duration-300 ease-in-out ${theme ? '-translate-x-9' : ''}`}> {theme ? 'light' : 'dark'} </label> 
                 </div>



               </div> }


               </div>
                                  



 
    )

}