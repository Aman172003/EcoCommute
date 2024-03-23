import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img
              className="block lg:hidden h-12 w-auto"
              src={logo} 
              alt="Logo"
            />
            <img
              className="hidden lg:block h-12 w-auto"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/route-recommendation"
                className="text-gray-900 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Route Recommendation
              </Link>
              <Link
                to="/car-pooling"
                className="text-gray-900 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Car Pooling
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-900 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Leaderboard
              </Link>
              <Link
                to="/redeem"
                className="text-gray-900 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Redeem
              </Link>
              <Link
                to="/community"
                className="text-gray-900 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Community
              </Link>
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
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/route-recommendation"
              className="text-gray-900 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Route Recommendation
            </Link>
            <Link
              to="/car-pooling"
              className="text-gray-900 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Car Pooling
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-900 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Leaderboard
            </Link>
            <Link
              to="/redeem"
              className="text-gray-900 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Redeem
            </Link>
            <Link
              to="/community"
              className="text-gray-900 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Community
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
