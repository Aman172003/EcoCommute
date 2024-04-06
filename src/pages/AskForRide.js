import React, { useEffect, useState } from "react";
import passenger from "../assets/passenger.jpg";
import { useNavigate } from "react-router-dom";

const AskForRide = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [drivers, setDrivers] = useState([]);
  const [passengerId, setPassengerId] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const url = new URL(`${host}/driver/availabledrivers`);
      url.searchParams.append("source", source);
      url.searchParams.append("destination", destination);

      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setDrivers(responseData.availableDrivers);
          setPassengerId(responseData.newPassenger._id);
        } else {
          console.error("Error fetching drivers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    if (source.trim() !== "" && destination.trim() !== "") {
      fetchDrivers();
    }
  }, [source, destination]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (source.trim() !== "" && destination.trim() !== "") {
      console.log("Form submitted:", { source, destination, passengerId });
      //   await availableDrivers();
      console.log(drivers);
      navigate("/car-pooling/askforride/availabledrivers", {
        state: { drivers, passengerId, source, destination },
      });
    } else {
      alert("Please fill in both source and destination fields.");
    }
  };

  return (
    <div className="container mx-auto mt-2 px-4">
      <div className="flex justify-center items-center mb-8">
        <form onSubmit={handleSubmit} className="flex-1 mr-8">
          <h2 className="text-3xl font-semibold mb-4 text-custom-green">
            Ask For Ride
          </h2>
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-lg font-semibold mb-2"
            >
              Source:
            </label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-lg font-semibold mb-2"
            >
              Destination:
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          {/* <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">Available Drivers</button> */}
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-4"
            type="submit"
          >
            Available drivers
          </button>
        </form>
        <div className="flex-1 md:block hidden">
          <img src={passenger} alt="Image" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AskForRide;
