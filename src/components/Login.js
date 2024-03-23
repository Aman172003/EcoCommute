import React from "react";
import logo from "../assets/logo.png";
const colors = {
  primary: "#9BCF53",
  background: "#BFEA7C",
  disabled: "#D9D9D9",
};

const Login = () => {
  const leftHalfStyle = {
    background: `linear-gradient(to right, ${colors.primary}, ${colors.background})`,
  };
  const logoStyle = {
    width: "40%", // Adjust the width of the logo as needed
    maxWidth: "200px", // Set a maximum width for responsiveness
  };
  return (
    <div className="w-full h-screen flex items-start">
      <div className="flex w-1/2 h-screen" style={leftHalfStyle}>
        <div className="w-1/2 h-screen flex items-center justify-center">
          <img className="w-3/4" src={logo} alt="Logo" />
        </div>
        <div
          className="text-green-800 text-3xl font-bold w-1/2 flex items-center justify-center"
          style={logoStyle}
        >
          EcoCommute
        </div>
      </div>

      {/* {right content} */}

      <div className="flex flex-col h-screen p-6 items-center justify-center">


        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          

          <div className="w-50 h-50 bg-gray-200 p-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-900">
                Sign in to your account
              </h2>
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-green-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-green-800 hover:text-green-600"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
