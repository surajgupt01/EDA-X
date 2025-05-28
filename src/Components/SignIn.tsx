import { SignIn } from "@clerk/clerk-react"
import { useNavigate } from "react-router"
import { dark} from '@clerk/themes'
import { useTheme } from '../Context/ThemeContext';

export default function SignnIn(){
    const navigate = useNavigate()
     const { theme } = useTheme();
    return(

        <div className="flex justify-center items-center h-screen dark:bg-neutral-950 cursor-pointer" >
         <div className="absolute top-5 left-5" onClick={()=>{navigate('/')}}>
            <p className="font-semibold text-lg ">
          <span className="dark:text-white">EDA-</span>
          <span className="text-blue-500">X</span>
        </p>
        </div>
          <SignIn redirectUrl="/dashboard" appearance={{baseTheme: theme === 'dark' ? dark : undefined}} />
              
        </div>


    )

}