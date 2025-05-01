import Cross from "./cross";
import {motion } from "motion/react"
import Select from 'react-select'
import { customStyles } from "./customStyles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Plots({setPlot , columns , fileP , setColumnNames , ColumnName , PlotType , setPlotType , setColData , setDataset} : any){
    
    type demo = {

        value : string,
        label : string

    }
    const options : demo[] = []
    const options2 : demo[] = []
    const [cateData , SetCatCol] = useState<string[]>()
       


     for(let i = 0 ;  i < columns.categorical_columns.length ; i++)
     {
        options.push({value : columns.categorical_columns[i] , label : columns.categorical_columns[i]})

     }
     for(let i = 0 ;  i < columns.numerical_columns.length ; i++)
      {
         options2.push({value : columns.numerical_columns[i] , label : columns.numerical_columns[i]})
 
      }

      const plotsOptions = [
        {value : 'Bar' , label : 'Bar'},
        {value : 'Histogram' , label : 'Histogram'},
        {value : 'Pie' , label : 'Pie'},
      ]

      console.log("plotss" , PlotType)
       
     async function getColumns(){

      if (!fileP) {
        console.error("No file selected");
        return;
      }

     

        const formData = new FormData();
    
        // Append the file and other data to the FormData object
        formData.append('file', fileP);  // Assuming fileP is your file input
        formData.append('PlotType', PlotType);
        formData.append('CatCol', JSON.stringify(cateData)); 
        formData.append('NumCol', JSON.stringify(ColumnName)); 

        console.log(fileP)

        try {
            const response = await axios.post(
              "http://127.0.0.1:8000/Plot", 

              formData,
              
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
        
            console.log("Response dataover ::", response);
            return response.data;
          } catch (error) {
            console.error("Error uploading file:", error);
          }

     } 

     const getCols = useMutation({
        mutationFn : getColumns , onSuccess : (data)=>{
            setDataset(data)
            console.log("ddd",data)
        }
     })



    return(
       
        <motion.div className='absolute w-full h-full flex justify-center items-center bg-transparent backdrop-blur-xs '
          initial={{opacity:0 , scale:0.5}}
          animate={{opacity:100 , scale:1 }}
          exit={{opacity:0 , scale:0.5}}
          transition={{duration:0.1 , ease:"easeIn"}}

        >
         <form  onSubmit={(e) => {
                e.preventDefault();
               getCols.mutate();
              }}> 
        <div className='relative flex flex-col justify-center items-center w-120 min-h-70 h-auto border-1 border-gray-900 rounded-xl bg-neutral-900  shadow-sm shadow-gray-900'>
            <Cross setPlot={setPlot}/>
           <p className='text-white font-semibold text-xl mb-4 '>Generate Plots</p>
           {/* <select className='w-80 h-10 rounded-md bg-neutral-700 text-white  p-1 m-2 appearance-none px-5 '>
            
            {columns.map((e:any,index:number)=>(
                
                <option className="font-semibold " key={index}>{e}</option>
                 
                  

            ))} */}


            <Select options={options} className="w-80" isMulti={true} styles={customStyles} placeholder="Categorical Data" id="Columns-Names" 
               onChange={(selectedOptions)=>{
                 if (selectedOptions) {
                    const values = selectedOptions.map((opt) => opt.value);
                    
                      SetCatCol(values)
                    
                  }
            }} />

            <Select options={options2} className="w-80 mt-2" isMulti={true} styles={customStyles} placeholder="Numerical Data" id="Columns-Names" 
            onChange={(selectedOptions)=>{
                 if (selectedOptions) {
                    const values = selectedOptions.map((opt) => opt.value);
                    
                    setColumnNames(values)
                    
                  }
            }} />
            
          {/* </select> */}
          <Select 
             options={plotsOptions} 
             className="w-80 mt-2" 
             styles={customStyles} 
             id="plotType" 
             value={plotsOptions.find(opt => opt.value === PlotType)} // Controlled component
             onChange={(selected) => {
              if (selected) {
                console.log(selected)
                setPlotType(selected.value); // Set only the string like "Bar"
                console.log(PlotType)

              }
             }}
            />

          <button type="submit" className='h-10 w-30 rounded-md text-white text-center bg-blue-500 cursor-pointer font-semibold hover:bg-blue-600 mt-4' >Generate</button>

        </div>
        </form>  
    </motion.div>
   
    )
}