
import {Route , Routes , BrowserRouter} from 'react-router'
import Landing from './Components/Landing'
import DashBoard from './Components/Dashboard'
import Nav from './Components/Nav'
import Opt from './Components/Opt'
import Accordian from './Components/Accorian'
import Plots from './Components/Plots'


    {/* <Opt></Opt> */}
    {/* <Accordian/> */}

function App() {




  return (
   <>

      <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/dashboard' element={<Opt/>}></Route>
    </Routes>
    </BrowserRouter>

    
   
   </>
  )
}

export default App










 
