import './App.css';
import Login from './Components/Authentication/signin';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from './Components/Pages/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/infinityfrontend' element={<Login/>}/>
      </Routes>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
