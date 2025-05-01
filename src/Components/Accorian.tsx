
import {  useState } from "react"

type AccordionProps = {
    title: string;
    content: string; 
    icon : any
  };

  

export default function Accordian({title   , content , icon  } : AccordionProps){

    const [open , setOpen] = useState(false)

    function handleAccord()
    {
        setOpen(!open)

    }

    return(

        <div className="flex flex-col text-white  ">

            <div className="flex items-center">
              
              <div>{icon}</div>
              <button onClick={handleAccord} className={`cursor-pointer transition-transform duration-300 ease-in-out  ${open? ' text-red-500' : ''} `}>{title}</button>




            </div>

            <button className={ `ml-8 hover:text-gray-400 text-left text-sm  duration-300 ease-in-out ${open ? 'h-10 opacity-100 ' : 'h-0 opacity-0'}`}>{content} </button>


        </div>

    )

}