import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Legend, Tooltip, ArcElement } from "chart.js";
import { useEffect, useState } from 'react';

ChartJS.register(Legend, Tooltip, ArcElement);

type PieData = {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string[],
    hoverOffset?: number
  }[]
}

export default function PieC({ data  , setPieD }: any) {


  const [piedata, setPieData] = useState<PieData[]>([]);

  useEffect(() => {
    if (data && data.type =='pie') {
      setPieData(prev => {
        const isDuplicate = prev.some(pie => JSON.stringify(pie) === JSON.stringify(data));
        if (!isDuplicate) {
          return [...prev, {
            labels: data.labels,
            datasets: data.datasets,
          }];
        }
        return prev;
      });

      setPieD(piedata)
    }



  }, [data]);

  return (
    <>
      <div className='flex justify-center items-center mb-10'>

      
      {piedata.length > 0 && (
        
        <div className="items-center grid grid-cols-2 gap-5  ">
      <p className='text-blue-500 font-semibold text-2xl mt-5 '>Pie-Charts</p>

          {piedata.map((pie, index) => (
            <div key={index} className="flex flex-col  items-center mt-2 border-1 dark:border-gray-900 border-gray-300 hover:border-gray-400 duration-500 ease-in-out rounded-md shadow-xs dark:shadow-gray-800 shadow-gray-300  h-135 p-4 w-130 cursor-pointer">
              <p className="dark:text-blue-200  text-blue-400 font-semibold text-lg  mb-2">
                {pie.datasets[0].label}
              </p>
              <Pie data={pie} className=" scale-75" />
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
