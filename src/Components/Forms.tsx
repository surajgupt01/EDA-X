import UploadIcon from "./UploadIcon";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import React from "react";
import Send from "./send";
import { useMutation} from "@tanstack/react-query";
import { motion } from "motion/react";
import PieC from "./Pie";
import BarG from "./BarG";
import CorrelationImage from "./CorrelationImage";


export default function Forms({
  dataOverview,
  StatOverview,
  setColumns,
  setFileP,
  dataset,
  piedata,
  setPieData,
  corr,
  element,
  element2,
}: any) {

  const typer = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setType(e.target.value);
};

  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: any) => {
    setFile(event.target.files[0]);
  };


async function handleSubmit(prompt : string, file : File) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
    console.log("File added:", file.name);
  }

  if (prompt) {
    formData.append("query", prompt);  // use "query" to match FastAPI route
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/analyze/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during analysis:", error);
    return { error: "Request failed." };
  }
}

  type DataType = {
    type: string;
    data: string;
  };

  const [Data, setData] = useState<DataType[]>([]);

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
    mutationFn: Doverview,
    onSuccess: (x) => {
      x.map((ele: any) => {
        if (ele.type == "columns") {
          setColumns(ele.data);
          console.log("colss", ele.data);
        }
      });

      setData((prevData) => [...prevData, ...x]);
    },
  });

  useEffect(() => {
    if (dataOverview && !isOverviewFetched) {
      Overview.mutate();
      setIsOverviewFetched(true);
    }
  }, [dataOverview, isOverviewFetched]);

  async function DoStat() {
    if (StatOverview) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/Stat",
          { "file ": file },
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
    mutationFn: DoStat,
    onSuccess: (x) => {
      setData((prevData) => [...prevData, ...x]);
    },
  });

  useEffect(() => {
    if (StatOverview && !isStatFetched) {
      Stat.mutate();
      setIsStatFetched(true);
    }
  }, [StatOverview, setIsStatFetched]);

  useEffect(() => {
    setPieData(dataset);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [Data, piedata, dataset, corr]);

  return (
    <div className="dark:bg-zinc-950 bg-neutral-100 duration-300 ease-in-out p-4 flex flex-col justify-center items-center h-full  w-full  ">
     
      <div
        className=" w-[97%] mt-2  dark:border-gray-900 border border-gray-300 duration-300 ease-in-out    min-h-[85%]   overflow-auto  scroll-smooth flex flex-col jusctify-center   mb-5 rounded-2xl pb-10   "
        ref={scrollRef}
      >
        {/* <Logo></Logo> */}
        {Data && (
          <motion.div className="p-5 text-sm " initial="hidden" ref={element}>
            {Data.map((e: any, index: number) => (
              <React.Fragment key={index}>
                {/* {e.type == 'image' && imageUrl ?  <img src={imageUrl} className="w-130 h-100 mt-2 mb-2"></img> : null } */}
                {e.type != "image" && e.type != "columns" && (
                  <div className="mt-2 mb-2 font-semibold text-3xl text-blue-500">
                    {e.type}
                  </div>
                )}
                {e.type != "image" && e.type != "columns" ? (
                  <motion.div
                    className="text-xs transition-transform duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    {parse(e.data)}
                  </motion.div>
                ) : null}
                {index !== Data.length - 1 && <br />}
                <hr className="dark:text-gray-700 text-gray-300 h-[1px]"></hr>
              </React.Fragment>
            ))}
            <div ref={element2}>
              {piedata && (
                <PieC data={dataset} piedata={piedata} setPieD={setPieData} />
              )}
              {dataset?.type === "bar" && <BarG data={dataset} />}
              {corr && <CorrelationImage file={file}></CorrelationImage>}
            </div>

            {/* <img src={data} className="w-50 h-50"></img>   */}
          </motion.div>
        )}
      </div>

      {/* ////////////////////////////////////////////////////////// */}

      <form className="absolute  bottom-5  "  onSubmit={(e) => {
                    e.preventDefault(); 
                    if(type && file)handleSubmit(type , file);   
                    console.log(type)  
            }}>
        <div className=" sm:w-[90vw] w-[95vw] md:w-[60vw] dark:bg-neutral-900 bg-neutral-800 duration-300 ease-in-out  border-1 border-neutral-950 rounded-2xl h-auto p-3 flex shadow-gray-900  ">
          <div>
            <label htmlFor="file_input" className="cursor-pointer mr-4 group">
              <UploadIcon />
              <span className="bg-gray-200 text-gray-500 absolute -mt-15 ml-2 duration-300 ease-in-out text-xs font-semibold rounded-md p-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 border-white">
                Upload file
              </span>
            </label>
            <input
              type="file"
              id="file_input"
              name="file"
              className="w-10 ml-2 mt-5 cursor-pointer bg-white opacity-0 hidden"
              onChange={handleFileUpload}
            ></input>
          </div>

          <textarea
            onInputCapture={handleInput}
            name="prompt"
            ref={typer}
            className={`ml-4 dark:bg-neutral-900 bg-neutral-800 duration-300 ease-in-out w-full rounded-lg focus:outline-none p-3 border dark:border-gray-900 dark:focus:border-gray-900 border-neutral-800 text-white resize-none overflow-hidden ${
              type ? "" : "animate-pulse"
            } `}
            rows={1}
            onInput={(e) => {
              const txt = e.target as HTMLTextAreaElement;
              txt.style.height = "auto";
              txt.style.height = `${txt.scrollHeight}px`;
            }}
            placeholder="Enter your requirements"
          ></textarea>
          <button type="submit">
            <Send></Send>
          </button>
        </div>
      </form>
    </div>
  );
}
