import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  var name = "";
  useEffect(() => {
    name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  const handleSignOut = () => {
    toast.success("Successfully, Signed Out");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("coins");
    setIsSignedIn(false);
    setSelectedLink(null);
    navigate("/");
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-12 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* <Link
                to="/route-recommendation"
                className={`${
                  selectedLink === "/route-recommendation"
                    ? "text-green-600"
                    : "text-gray-900 hover:text-green-600"
                } px-3 py-2 rounded-md font-medium`}
                onClick={() => handleLinkClick("/route-recommendation")}
              >
                Route Recommendation
              </Link> */}
              <Link
                to="/car-pooling"
                className={`${
                  selectedLink === "/car-pooling"
                    ? "text-green-600"
                    : "text-gray-900 hover:text-green-600"
                } px-3 py-2 rounded-md font-medium`}
                onClick={() => handleLinkClick("/car-pooling")}
              >
                Car Pooling
              </Link>
              <Link
                to="/leaderboard"
                className={`${
                  selectedLink === "/leaderboard"
                    ? "text-green-600"
                    : "text-gray-900 hover:text-green-600"
                } px-3 py-2 rounded-md font-medium`}
                onClick={() => handleLinkClick("/leaderboard")}
              >
                Leaderboard
              </Link>
              <Link
                to="/redeem"
                className={`${
                  selectedLink === "/redeem"
                    ? "text-green-600"
                    : "text-gray-900 hover:text-green-600"
                } px-3 py-2 rounded-md font-medium`}
                onClick={() => handleLinkClick("/redeem")}
              >
                Redeem
              </Link>
              <Link
                to="/community"
                className={`${
                  selectedLink === "/community"
                    ? "text-green-600"
                    : "text-gray-900 hover:text-green-600"
                } px-3 py-2 rounded-md font-medium`}
                onClick={() => handleLinkClick("/community")}
              >
                Community
              </Link>
              {isSignedIn ? (
                <button
                  onClick={handleSignOut}
                  className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md font-medium"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`${
                    selectedLink === "/login"
                      ? "text-green-600"
                      : "text-gray-900 hover:text-green-600"
                  } px-3 py-2 rounded-md font-medium`}
                  onClick={() => handleLinkClick("/login")}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <Link
              to="/route-recommendation"
              className="text-gray-900 hover:text-green-600 text-base font-medium block"
            >
              Route Recommendation
            </Link>
            <Link
              to="/car-pooling"
              className="text-gray-900 hover:text-green-600 text-base font-medium block"
            >
              Car Pooling
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-900 hover:text-green-600 text-base font-medium block"
            >
              Leaderboard
            </Link>
            <Link
              to="/redeem"
              className="text-gray-900 hover:text-green-600 text-base font-medium block"
            >
              Redeem
            </Link>
            <Link
              to="/community"
              className="text-gray-900 hover:text-green-600 text-base font-medium block"
            >
              Community
            </Link>
            {isSignedIn ? (
              <button
                onClick={handleSignOut}
                className="text-gray-900 hover:text-green-600 rounded-md block text-base font-medium"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className={`${
                  selectedLink === "/login"
                    ? "text-green-600"
                    : "text-gray-900 hover:text-green-600"
                } rounded-md text-base block font-medium`}
                onClick={() => handleLinkClick("/login")}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
