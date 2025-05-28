export default function Cross({setPlot} : any){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 dark:text-white text-gray-700 cursor-pointer hover:text-gray-400  absolute top-2 right-2 " onClick={()=>{setPlot((e:any)=>!e)}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 
    )
}