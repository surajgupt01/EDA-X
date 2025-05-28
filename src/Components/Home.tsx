import { useNavigate } from "react-router";
import Light from "./light";
import Dark from "./dark";
import { useTheme } from "../Context/ThemeContext";
import { motion } from "motion/react";
import Rocket from "./Rocket";
import Mag from "./Magnify";
import LetsGo from "./Lgo";
import Anamoly from "./Anamoly";
import IChart from "./ICharts";
import Fix from "./Fix";
import Report from "./Report";

export default function Home() {
  const navigate = useNavigate();
  // const [mode , setMode] = useState<string>()
  const { theme, toggleTheme } = useTheme();

  const handleScroll = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  return (
    <div className=" relative flex items-center  w-full flex-col  p-10 dark:bg-neutral-950 bg-white  duration-700 ease-in-out">
      <motion.div
        initial={{ translateY: 20 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mb-20 flex justify-between w-full px-10 items-center "
      >
        <p className="font-semibold text-lg ">
          <span className="dark:text-white">EDA-</span>
          <span className="text-blue-500">X</span>
        </p>
        <div className="flex items-center justify-center">
          {/* <div className={`border-1 border-gray-300 p-2 rounded-lg flex justify-center items-center mr-4 bg-gray-200`}><img src="../../public/github.svg" className="scale-200 cursor-pointer "></img></div> */}
          <button
            className="relative border bg-gray-200 rounded-full  mr-2 cursor-pointer border-gray-200 items-center justify-center  overflow-hidden h-8 w-8   "
            onClick={() => {
              toggleTheme(!theme);
            }}
          >
            <Light /> <Dark />
          </button>
          <button className="py-2 px-8 rounded-4xl bg-black text-white cursor-pointer hover:bg-neutral-800 ease-in-out duration-300 hover:text-blue-500 dark:bg-gray-800 mr-2  " onClick={()=>{navigate('/login')}}>
            LogIn
          </button>
        </div>
      </motion.div>
      <motion.h2
        initial={{ translateY: 20 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-clip-text text-transparent text-center bg-gradient-to-b bg-neutral-950 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight dark:text-white"
      >
        EDA-<span className="text-blue-500 ">X</span>
        <br />
      </motion.h2>
      <motion.p
        initial={{ translateY: 10 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="max-w-4xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center "
      >
        Whether you're a data scientist, analyst, or engineer, EDA-X empowers
        you with powerful visual tools, intuitive dashboards, and AI-assisted
        exploration — all in one seamless interface.
      </motion.p>
      <div className="mt-5 flex justify-center items-center text-center">
        <motion.button
          initial={{ translateY: 10 }}
          animate={{ translateY: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className=" bg-black dark:bg-gray-800 text-white py-2 px-12 rounded-md text-sm text-center cursor-pointer mr-2 group relative h-9 overflow-hidden hover:text-blue-500"
          onClick={handleScroll}
        >
          <span className="absolute inset-0 flex items-center justify-center transform -translate-y-10 opacity-0 transition duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
            <Mag />
            Explore
          </span>
          <span className="absolute inset-0 flex items-center justify-center transform translate-y-0 transition duration-300 ease-linear group-hover:translate-y-10">
            <Mag />
            Explore
          </span>
        </motion.button>

        <motion.button
          initial={{ translateY: 10 }}
          animate={{ translateY: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-1 border-gray-300 py-2 px-4 rounded-md text-sm  text-center cursor-pointer hover:bg-gray-200 ease-in-out duration-300 dark:bg-gray-100 hover:text-blue-600 font-semibold flex justify-center items-center "
          onClick={() => {
            navigate("/login");
          }}
        >
          Get Started <Rocket />{" "}
        </motion.button>
      </div>
      <motion.div
        initial={{ translateY: 10 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=" mt-10 flex justify-center w-2xl h-110  rounded-2xl  overflow-hidden relative shadow-sm shadow-gray-200 dark:shadow-gray-900 "
      >
        <p className="w-xs absolute left-15  top-30 dark:text-gray-300">
          {" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text text-4xl ">
            Visualize
          </span>{" "}
          <br></br> <span className="text-2xl font-semibold">eliminate</span>{" "}
          guesswork, and <br></br>turn{" "}
          <span className="bg-gradient-to-r from bg-gray-700 to-gray-400 text-transparent bg-clip-text text-2xl">
            complexity
          </span>{" "}
          <br></br> into clarity with{" "}
          <span className="font-semibold text-2xl">
            EDA-
            <span className="text-blue-500 animate-pulse duration-700 ease-in-out">
              X
            </span>
          </span>
        </p>

        <img
          src="../../public/Screenshot 2025-05-04 124916.png"
          className="w-full rounded-2xl shadow-2xl shadow-gray-600 absolute left-90 top-20 dark:shadow-gray-900 "
        ></img>
      </motion.div>


     <div className="w-full mt-30 text-gray-700 flex justify-center items-center text-3xl font-semibold dark:text-gray-400"> Explore Smarter with <span className=" ml-2 dark:text-gray-100 ">EDA-</span> <span className="text-blue-500">X</span> </div> 


      <div className=" w-full  flex justify-center items-center relative scale-80">
        <div className="w-full">

          

          <div className="flex  justify-evenly w-full  items-center ">
             
            <div className="w-180 h-145 p-4 rounded-xl   dark:shadow-gray-800 inset shadow-xs shadow-gray-200 overflow-hidden  cursor-pointer scale-95">
              <h2 className="text-3xl font-semibold dark:text-white">
              EDA-<span className="text-blue-500">X</span>
            </h2>

            <div className="bg-gray-50   ml-30 mt-8 rounded-xl">
              <img src="../../public/p2.png" className="scale-135 absolute left-80 top-25 shadow-2xl shadow-gray-600 dark:shadow-gray-900 rounded-2xl"></img>

            </div>

            

            </div>

            <div className="text-2xl font-semibold dark:text-gray-200">
               <div className="text-4xl"><span className="text-blue-500">AI</span> Assisted Exploration</div>


                <p>Seamless <span className="text-4xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Dashboading</span></p>
                <div>
                 <p>Powered by</p>
                <img src="../../public/gemini-brand-color.svg" className=""></img>


                </div>

                <div className="text-sm text-gray-500 dark:text-gray-200">
                  <p>
                    Our services are tailored to empower data scientists, analysts, and engineers with intuitive,<br></br> 
                    intelligent, and automated capabilities. <br></br>
                    Whether you're dealing with raw datasets or seeking AI-powered insights, <br></br>
                    EDA-X helps you visualize, understand, and communicate your data like never before.
                  </p>
                </div>
            </div>

          

           
          </div>
        </div>
      </div>



      <div className="w-full flex  justify-evenly items-center mt-15 mb-140">

        <div className="flex flex-col  items-start ">

        
        <p className="text-gray-700 dark:text-gray-400 flex justify-center items-center text-3xl font-semibold">What are our offering services</p>
          <p className="text-xs text-gray-700 mt-4">
            Explore the power of EDA-X — designed not just to analyze data, but to make data work for you. 
            <br></br>Our platform blends simplicity with intelligence, helping you uncover patterns, 
            <br></br>find answers, and tell compelling data stories without the clutter.
          </p>

          <button className="px-4 cursor-pointer hover:bg-blue-600 bg-blue-500 font-semibold text-white rounded-md py-2 mt-4 flex justify-center items-center" onClick={()=>{navigate('/login')}}>Learn More <LetsGo/></button>

          </div>
        
        <div className="scale-90 ">
           <div className="flex justify-center items-center mt-10 w-full">
          <div className="w-60 h-50 bg-gray-200 m-1 rounded-xl shadow-md flex justify-center items-center text-2xl font-semibold text-gray-600 dark:bg-neutral-800 dark:text-gray-300 cursor-pointer hover:scale-90 duration-300 ease-in-out"> <Report/> One-Click <br></br> Reports </div>
          <div className="w-50 h-60 bg-gray-200 m-1 rounded-xl shadow-md flex justify-center items-center text-2xl font-semibold flex-col p-4 text-gray-600 dark:bg-neutral-800 dark:text-gray-300 cursor-pointer hover:scale-90 duration-300 ease-in-out"> <Anamoly/>Pattern & <br></br> Anomaly Detection </div>
          
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-50 h-60 bg-gray-200 m-1 rounded-xl shadow-md flex justify-center items-center text-2xl font-semibold flex-col p-4 text-gray-600 dark:bg-neutral-800 dark:text-gray-300 cursor-pointer hover:scale-90 duration-300 ease-in-out"> <IChart/> <p>Interactive  Visualizations</p> </div>
          <div className="w-60 h-50 bg-gray-200 m-1 rounded-xl shadow-md flex justify-center items-center text-2xl font-semibold p-4 text-gray-600 dark:bg-neutral-800 dark:text-gray-300 cursor-pointer hover:scale-90 duration-300 ease-in-out" > <Fix/> <p>Automated <br></br> Data Cleaning </p> </div>
          
        </div>

        </div>
       
      </div>

      <div className=" h-100 bg-gray-100 w-full absolute bottom-0 dark:bg-neutral-900">
         <div className="  sm:h-100 h-full text-md text-gray-500 p-10 grid sm:grid-cols-5 grid-cols-2 justify-center dark:bg-neutral-900 scale-90 ">

            <div className="flex flex-col gap-2">
           <span className="font-semibold text-blue-500">PRODUCT</span> 

           <p>Integrations</p> 
           <p>Features</p> 
           <p>Pricing</p> 
           <p>Watch Demo</p>
           <p>Changelog</p>
            </div>

          <div className="flex flex-col gap-5">
           <p className="font-semibold text-blue-500">SUPPORT</p> 

            <p>Security</p>
            
            <p>Book a demo</p>
            <p>Contact Us</p>

          </div>

          <div className="flex flex-col gap-5">
           <p className="font-semibold text-blue-500">LEGAL</p> 

            <p>Privacy Policy</p>
            
            <p>Terms of Service</p>
            <p>Disclosure</p>

          </div>
          
          <div className="flex flex-col gap-5">
           <p className="font-semibold text-blue-500">RESOURCES</p> 

            <p>Blogs</p>
            
            <p>Comparison</p>
            <p>User guide</p>

          </div>

          <div className="flex flex-col gap-2 sm:col-span-1 col-span-2 ">
             <p className="font-semibold text-sm">Read how a second brain makes life easier</p>
             <input type="text" placeholder="Your email address" className="border-1 border-gray-400 rounded-lg p-2" />
             <button className="bg-blue-500 text-white font-semibold p-2 rounded-lg cursor-pointer text-center">Get updates</button>
          </div>

         </div> 

      </div>
    </div>
  );
}
