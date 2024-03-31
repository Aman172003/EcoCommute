import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import RouteRecommend from "./pages/RouteRecommend";
import Carpooling from "./pages/Carpooling";
import Redeem from "./pages/Redeem";
import Community from "./pages/Community";
import Footer from "./components/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Leaderboard from "./pages/Leaderboard";
import CampaignState from "./context/CampaignState";

// Custom component to control the visibility of Navbar and Footer
function NavigationControl() {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <React.Fragment>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route-recommendation" element={<RouteRecommend />} />
        <Route path="/car-pooling" element={<Carpooling />} />
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/community" element={<Community />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </React.Fragment>
  );
}

function App() {
  return (
    <CampaignState>
      <Router>
        <NavigationControl />
      </Router>
    </CampaignState>
  );
}

export default App;
