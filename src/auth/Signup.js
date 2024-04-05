import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import GeneralContext from "../context/GeneralContext";
// import { BiChevronDown } from "react-icons/bi";
// import { AiOutlineSearch } from "react-icons/ai";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";

const Signup = () => {
  const context = useContext(GeneralContext);
  const { setLeaderboardData } = context;
  const navigate = useNavigate();

  // const cities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Hydrabad"];
  // const [input, setInput] = useState("");
  // const [selected, setSelected] = useState("");
  // const [open, setOpen] = useState(false);
  // const [warning, setWarning] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const SignIn = async (payload) => {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      const temp = await setLeaderboardData(localStorage.getItem("name"), 15);
      console.log(temp);
      // Wait for the user data to be updated
      const updatedData = await temp.find(
        (entry) => entry.user === localStorage.getItem("id")
      );

      console.log("Updated Data:", updatedData);

      // Set localStorage coins after the data is updated
      const userCoins = updatedData.coins;
      localStorage.setItem("coins", userCoins);

      console.log(localStorage.getItem("coins"));
      console.log("Successfully Signed In:");
      navigate("/");
    } else {
      console.log("Invalid Credentials");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("clicked");

    const { name, email, password } = credentials;
    const payload = {
      name,
      // city: selected,
      email,
      password,
    };
    await SignIn(payload);
  };

  const handleGoogleClick = async () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const email = data.user.email;
      const password = data.user.uid;
      const name = data.user.displayName;

      const payload = {
        name,
        email,
        password,
      };
      await SignIn(payload);
    });
  };
  // useEffect(() => {
  //   setValue(localStorage.getItem("email"));
  // });

  // const handleCitySelect = (city) => {
  //   setSelected(city);
  //   setOpen(false);
  //   setInput("");
  //   setWarning(false);
  // };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
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

      <div className="flex flex-col justify-center items-center py-2 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    onChange={onChange}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* dropdown to select the city */}

              {/* <div className="relative cursor-pointer">
                <label
                  htmlFor="cityDropdown"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <div
                    onClick={() => setOpen(!open)}
                    className={`bg-white w-full px-3 py-2 flex text-gray-500 border border-gray-300 items-center justify-between focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm rounded ${
                      selected && "text-gray-900"
                    }`}
                    id="cityDropdown"
                  >
                    {selected ? selected : "Select City"}
                    <BiChevronDown
                      size={20}
                      className={`${open && "rotate-180"}`}
                    />
                  </div>
                  <ul
                    className={`absolute mt-2 overflow-y-auto z-10 bg-white border border-gray-300 rounded shadow-md ${
                      open ? "w-full max-h-60" : "max-h-0 hidden"
                    }`}
                  >
                    <div className="flex items-center px-2 sticky top-0 bg-white">
                      <AiOutlineSearch size={18} className="text-gray-300" />
                      <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        value={input}
                        placeholder="Enter City name"
                        className="placeholder:text-gray-300 p-2 outline-none"
                      />
                    </div>
                    {cities?.map((city) => (
                      <li
                        key={city}
                        className={`p-2 text-sm hover:bg-[#5CD3AB] hover:text-white ${
                          city?.toLowerCase() === selected?.toLowerCase() &&
                          "bg-[#5CD3AB] text-white"
                        } ${
                          city?.toLowerCase().startsWith(input.toLowerCase())
                            ? "block"
                            : "hidden"
                        }`}
                        onClick={() => handleCitySelect(city)}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
                {warning && (
                  <p className="absolute text-red-500 text-xs -bottom-4 ml-1">
                    Please select city
                  </p>
                )}
              </div> */}

              {/* end of dropdown */}

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
                    onChange={onChange}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

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
                    minLength={8}
                    name="password"
                    onChange={onChange}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
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
                    minLength={8}
                    type="password"
                    onChange={onChange}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
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
                    onClick={handleGoogleClick}
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
      </div>
    </div>
  );
};

export default Signup;
