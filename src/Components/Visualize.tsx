export default function Visualize(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#grad2)" className="size-4 mr-2">
<defs>

<linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stopColor="#43e97b" />  {/* mint green */}
  <stop offset="50%" stopColor="#38f9d7" /> {/* aqua */}
  <stop offset="100%" stopColor="#2b86c5" /> {/* cool blue */}
</linearGradient>

</defs>

  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
</svg>

    )
}