import DashBoard from "./Dashboard";
import Nav from "./Nav";
import Forms from "./Forms";
import { useState } from "react";
import Plots from "./Plots";


type catCols = {

    numerical_cols : string[],
    categorical_cols : string[]

}

type PieData = {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string[],
      hoverOffset?: number
    }[]
  }
  

export default function Opt(){

    const [dataOverview , setDatOverview] = useState(false)
    const [StatOverview , setStatOverview] = useState(false)
    const[plot , setPlot] = useState(false)
    const [columns , setColumns] = useState<catCols>()
    const [fileP , setFileP]  = useState<File|null>()
    const [ColumnName , setColumnNames] = useState<string[]>([])

    const [PlotType , setPlotType] = useState<string>()

    const [colData , setColData] = useState<any>()

    const [dataset , setDataset] = useState<any>()

    const [piedata, setPieData] = useState<PieData[]>([]);

   
   
    
    
    return(


        <div className="w-full h-full absolute bg-gray-900 flex text-white ">

            <div className="w-86 h-full">
                <Nav setDatOverview={setDatOverview} dataOverview={dataOverview} StatOverview={StatOverview} setStatOverview={setStatOverview} plot={plot} setPlot={setPlot}></Nav>
            </div>
            <div className="bg-green-400 w-full h-full overflow-auto flex justify-center  ">
                <Forms dataOverview={dataOverview} StatOverview={StatOverview} plot={plot} setColumns={setColumns} setFileP={setFileP}  colData={colData} dataset={dataset} setDataset = {setDataset}  PlotType={PlotType} piedata={piedata} setPieData={setPieData}/>
            </div>

            {plot && <Plots setPlot={setPlot} columns={columns} fileP={fileP} ColumnName={ColumnName} setColumnNames={setColumnNames} PlotType={PlotType} setPlotType={setPlotType} setColData={setColData} setDataset={setDataset} />}

        </div>



    )
}