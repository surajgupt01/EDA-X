
import {Route , Routes , BrowserRouter} from 'react-router'
import Landing from './Components/Landing'
import DashBoard from './Components/Dashboard'



function App() {




  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/dashboard' element={<DashBoard/>}></Route>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App










 
