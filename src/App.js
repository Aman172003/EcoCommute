// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import RouteRecommend from "./pages/RouteRecommend";
import Carpooling from "./pages/Carpooling";
import Redeem from "./pages/Redeem";
import Community from "./pages/Community";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/route-recommendation" element={<RouteRecommend />} />
          <Route path="/car-pooling" element={<Carpooling />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/community" element={<Community />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
