import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Opt from './Components/Opt';

import Home from './Components/Home';
import { ThemeProvider } from './Context/ThemeContext';
import SignnIn from './Components/SignIn';
import SignnUp from './Components/SignUp';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignnIn />} />
          <Route path="/signup" element={<SignnUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Opt />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
