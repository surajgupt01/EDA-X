import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface CorrelationImageProps {
  file: File |null;
}

export default function CorrelationImage({ file }: CorrelationImageProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  async function getCorr() {
    const formData = new FormData();
    if(file){
    formData.append("file", file);

    const response = await axios.post("http://127.0.0.1:8000/visualize", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
    }
  }

  const sendPrompt = useMutation({
    mutationFn: getCorr,
    onSuccess: (data) => {
      const urls: string[] = data.map((item: any) => {
        return `data:image/png;base64,${item.image}`;
      });
      setImageUrls(urls);
    },
  });



  useEffect(()=>{
      sendPrompt.mutate()
  },[])

  return (
    <div className="flex flex-col justify-between items-center mb-10">
      {/* <button onClick={() => sendPrompt.mutate()}>Generate Plots</button> */}
      <div className="text-2xl text-blue-500">Correlation Plot</div>
      {imageUrls.map((url, idx) => (
        <div key={idx} className="mt-8" >
          <h3>{idx === 0 ? "Heatmap" : "Scatter Plot"}</h3>
          <img src={url} alt={`plot-${idx}`} style={{ width: "100%", maxWidth: "500px" }} className="rounded-lg shadow-lg dark:shadow-gray-700  shadow-gray-300" />
        </div>
      ))}
    </div>
  );
}
