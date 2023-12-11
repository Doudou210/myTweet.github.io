import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './users/pages/Login';
import Tweet from './Tweet';
import Register from './users/pages/Register';
import Home from "./Home";
import HomeAd from "./admin/HomeAd";
import HomeUser from "./users/pages/HomeUser";
import UpdatePassword from "./users/pages/UpdatePassword";
import ForgotPassword from "./users/pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/tweet" element={<Tweet/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<HomeAd/>}/>
        <Route path="/user" element={<HomeUser/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/update" element={<UpdatePassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
