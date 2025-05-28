import { SignUp } from "@clerk/clerk-react";

export default function SignnUp(){
    return(

    
    <div className="flex justify-center items-center h-screen">
        <SignUp redirectUrl={'/dashboard'}/>
    </div>

    )

}