import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();
  const cities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Hydrabad"];
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="h-screen bg-gray-100 overflow-auto">
      <nav className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <img
            className="h-10 w-10 cursor-pointer"
            src={logo}
            alt="logo"
            onClick={(e) => navigate("/")}
          />
          <div
            onClick={() => navigate("/")}
            className="text-black text-2xl font-bold  cursor-pointer ml-2"
          >
            {" "}
            EcoCommute
          </div>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* dropdown to select the city */}

              <div class="relative cursor-pointer">
                <label
                  for="cityDropdown"
                  class="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <div
                    onClick={() => setOpen(!open)}
                    class={`bg-white w-full px-3 py-2 flex text-gray-500 border border-gray-300 items-center justify-between focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm rounded ${
                      selected && "text-gray-900"
                    }`}
                    id="cityDropdown"
                  >
                    {selected ? selected : "Select City"}
                    <BiChevronDown
                      size={20}
                      class={`${open && "rotate-180"}`}
                    />
                  </div>
                  <ul
                    class={`absolute mt-2 overflow-y-auto z-10 bg-white border border-gray-300 rounded shadow-md ${
                      open ? "w-full max-h-60" : "max-h-0 hidden"
                    }`}
                  >
                    <div class="flex items-center px-2 sticky top-0 bg-white">
                      <AiOutlineSearch size={18} class="text-gray-300" />
                      <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        value={input}
                        placeholder="Enter City name"
                        class="placeholder:text-gray-300 p-2 outline-none"
                      />
                    </div>
                    {cities?.map((city) => (
                      <li
                        key={city}
                        class={`p-2 text-sm hover:bg-[#5CD3AB] hover:text-white ${
                          city?.toLowerCase() === selected?.toLowerCase() &&
                          "bg-[#5CD3AB] text-white"
                        } ${
                          city?.toLowerCase().startsWith(input.toLowerCase())
                            ? "block"
                            : "hidden"
                        }`}
                        onClick={() => {
                          if (city?.toLowerCase() !== selected.toLowerCase()) {
                            setSelected(city);
                            setOpen(false);
                            setInput("");
                          }
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* end of dropdown */}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="custom-button w-full flex justify-center py-2 px-4"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-6 w-6"
                      src="https://www.svgrepo.com/show/506498/google.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-center text-gray-600 max-w">
            Have an account?{" "}
            <a
              onClick={(e) => navigate("/login")}
              href="#"
              className="font-medium text-[#32c896] hover:text-[#5CD3AB] transition-all ease-in-out duration-300"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
