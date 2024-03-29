import React, { useState } from "react";
import carp from "../assets/carp.jpg";
import driver from "../assets/driver.jpg";
import passenger from "../assets/passenger.jpg";

const Carpooling = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-1/2">
        <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold text-custom-green mb-4 lg:mb-8">
              Car Pooling
            </h2>
            <h2 className="text-lg lg:text-4xl font-semibold text-green-700 mb-4 lg:mb-8">
              Earn, Connect and Contribute to Greener Society
            </h2>
            <button
              onClick={toggleModal}
              type="button"
              className="custom-button px-5 py-3"
            >
              Start Your Journey
            </button>
            {showModal && (
              <div
              id="default-modal"
              className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200 bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-4xl h-fit">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-white-700 overflow-y-auto max-h-96">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5">
                    <button
                      onClick={toggleModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-green-600 dark:hover:text-white"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5 md:flex md:flex-wrap">
                    {/* Left Side */}
                    <div className="w-full md:w-1/2">
                      <img
                        src={driver}
                        alt="driver"
                        className="w-full"
                      />
                      <p className="text-xl font-semibold leading-relaxed text-gray-500 dark:text-gray-600 mt-4">
                        Are you a driver?
                      </p>
                      <button
                        onClick={toggleModal}
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-4"
                        type="button"
                      >
                        Give a ride
                      </button>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mt-4">
                        As a driver on our carpooling platform, you have the
                        opportunity to share your journey with others while
                        earning rewards. Offer available seats in your
                        vehicle to fellow travelers heading in the same
                        direction. By carpooling, you contribute to a greener
                        environment and reduce traffic congestion.
                      </p>
                    </div>
                    <div className="w-full md:hidden border-t border-gray-300 my-4"></div>
                    {/* Right Side */}
                    <div className="w-full md:w-1/2 md:mt-0">
                      <img
                        src={passenger}
                        alt="passenger"
                        className="w-full"
                      />
                      <p className="text-xl font-semibold leading-relaxed text-gray-500 dark:text-gray-600 mt-4 mb-4">
                        Are you a Passenger?
                      </p>
                      <button
                        onClick={toggleModal}
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        type="button"
                      >
                        Share a ride
                      </button>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mt-4">
                        As a passenger on our carpooling platform, you can
                        easily find and book rides with verified drivers
                        going your way. Enjoy a comfortable and affordable
                        travel option while connecting with like-minded
                        commuters.Join our community of passengers today and
                        experience the convenience of carpooling.
                      </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/2 p-8 flex justify-center items-center lg:mt-0 lg:-ml-8">
          <img
            src={carp}
            className="w-2/3 lg:w-full h-auto"
            alt="Carpooling"
          />
        </div>
      </div>
    </>
  );
};

export default Carpooling;
