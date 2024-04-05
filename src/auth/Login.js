import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../context/GeneralContext";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";

const colors = {
  primary: "#9BCF53",
  background: "#BFEA7C",
  disabled: "#D9D9D9",
};

const Login = () => {
  const context = useContext(GeneralContext);
  const { getLeaderboardData } = context;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const LogIn = async (payload) => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      const temp = await getLeaderboardData();
      const userEntry = await temp.find(
        (entry) => entry.user === localStorage.getItem("id")
      );
      const userCoins = userEntry.coins;
      localStorage.setItem("coins", userCoins);
      console.log(localStorage.getItem("coins"));
      console.log("Successfully logged In:");
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const payload = {
      email,
      password,
    };
    await LogIn(payload);
  };

  const handleGoogleClick = async () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const email = data.user.email;
      const password = data.user.uid;

      const payload = {
        email,
        password,
      };
      await LogIn(payload);
    });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const leftHalfStyle = {
    background: `linear-gradient(to right, ${colors.primary}, ${colors.background})`,
  };
  const logoStyle = {
    width: "40%", // Adjust the width of the logo as needed
    maxWidth: "200px", // Set a maximum width for responsiveness
  };
  return (
    <div className="w-full flex h-screen items-center justify-center">
      {/* LEFT CONTENT */}
      <div
        className=" w-1/2 h-screen hidden md:block overflow-hidden"
        style={leftHalfStyle}
      >
        <div className="flex flex-row items-center justify-center h-screen">
          <img
            className="md:w-32 xl:w-56 cursor-pointer"
            src={logo}
            alt="Logo"
            onClick={(e) => navigate("/")}
          />
          <div
            onClick={() => navigate("/")}
            className="text-green-800 text-4xl xl:text-6xl font-bold mt-5 ml-2 cursor-pointer"
          >
            EcoCommute
          </div>
        </div>
      </div>

      {/* {RIGHT CONTENT} */}
      <div className="flex w-screen md:w-1/2  h-screen flex-col align-middle items-center justify-center bg-gray-100">
        <div className="overflow-auto">
          <div className="flex flex-col justify-center items-center py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-8 text-center text-2xl font-bold text-gray-900">
                Sign In
              </h2>
              <p className="text-gray-500 text-xs">
                Sign in below to access your account
              </p>
            </div>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form
                  className="space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
                >
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
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
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
                        name="password"
                        type="password"
                        onChange={onChange}
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="custom-button px-4 py-2 group relative w-full flex justify-center"
                    >
                      Sign in
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
                        onClick={handleGoogleClick}
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
              <p className="text-center text-gray-600 max-w text-sm">
                Don't have an account yet?{" "}
                <a
                  onClick={(e) => navigate("/signup")}
                  href="#"
                  className="font-medium text-[#32c896] hover:text-[#5CD3AB] transition-all ease-in-out duration-300"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
