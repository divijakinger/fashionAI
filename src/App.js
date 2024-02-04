// import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from './chat components/Main';
import Stylist from './stylist components/Stylist';
import Color from './color generator/Color';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/ChatBot" element={<Main />} />
        <Route path="/Stylist" element={<Stylist />} />
        <Route path="/Color" element={<Color />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
