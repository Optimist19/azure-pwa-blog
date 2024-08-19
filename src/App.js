import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";

import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
