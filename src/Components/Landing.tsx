import { useNavigate } from "react-router"


export default function Landing(){
    const navigate = useNavigate()
    return(
        <>
        <div className="flex items-center justify-center h-screen bg-black text-white flex-col">
          {/* Title */}
          <h1 className="text-9xl font-bold text-white drop-shadow-lg">
            EDA-<span className="text-blue-500">X</span>
          </h1>
    
          <p className="text-lg text-center">"EDA-X: Unleash the Power of Data Exploration" <br></br><span className="text-md mt-2 text-amber-100"> Transforming Raw Data into Insightful Visuals with Ease</span></p>
          
          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="px-9 py-3 text-lg m-2 mr-4 font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-neon">
              Explore
            </button>
            <button className="px-9 py-3 text-lg m-2 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-neon-blue cursor-pointer" onClick={()=>{navigate('/dashboard')}}>
              Get Started
            </button>
          </div>
    
          {/* Neon Glow Effect */}
          <style>
            {`
              .shadow-neon {
                box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
              }
              .shadow-neon-blue {
                box-shadow: 0px 0px 12px rgba(0, 122, 255, 0.8);
              }
            `}
          </style>
        </div>
    
    
    
         
        </>
    )
}