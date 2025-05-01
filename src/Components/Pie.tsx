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
      
      {piedata.length > 0 && (
        
        <div className="items-center grid grid-cols-2 gap-2">
      <p className='text-blue-500 font-semibold text-4xl mt-5 '>Pie-Charts</p>

          {piedata.map((pie, index) => (
            <div key={index} className="flex flex-col  items-center mt-2 border-1 border-gray-700 rounded-md shadow-sm shadow-gray-800  scale-92">
              <p className="text-blue-200 font-semibold text-lg mt-4 mb-2">
                {pie.datasets[0].label}
              </p>
              <Pie data={pie} className=" scale-75" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
