export default function Correlation(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#grad4)" className="size-4 mr-2">
            <defs>
  <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stopColor="#34d399" /> {/* emerald-400 */}
    <stop offset="50%" stopColor="#eb34c9" /> {/* pink-purple */}
    <stop offset="100%" stopColor="#818cf8" /> {/* indigo-400 */}
  </linearGradient>
</defs>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
</svg>

    )
}