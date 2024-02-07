import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "../user/registration/Login";
import Table from "./Table";
import "./style.css";
import Register from "./registration/Register";

function RouteCompo() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouteCompo;
