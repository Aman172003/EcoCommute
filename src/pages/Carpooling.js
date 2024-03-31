import React, { useState } from "react";
import carp from "../assets/carp.jpg";

import CarpoolingModal from "../components/CarpoolingModal";

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
            <CarpoolingModal showModal={showModal} toggleModal={toggleModal} />
          </div>
        </div>
        <div className="lg:w-1/2 p-8 flex justify-center items-center lg:mt-0 lg:-ml-8">
          <img src={carp} className="w-2/3 lg:w-full h-auto" alt="Carpooling" />
        </div>
      </div>
    </>
  );
};

export default Carpooling;
