// import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from './chat components/Main';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/ChatBot" element={<Main />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
