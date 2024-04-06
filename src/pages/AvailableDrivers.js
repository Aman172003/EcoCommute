import React, { useState } from "react";
import passenger from "../assets/passenger.jpg";

const AskForRide = () => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [drivers] = useState([
        {id: 1, name: "John Doe", vehicle: "Toyota Camry", seats: 4 },
        {id: 2, name: "Jane Smith", vehicle: "Honda Civic", seats: 3 },
        { id: 3, name: "Alice Johnson", vehicle: "Ford Explorer", seats: 5 },
    ]);
  

    const handleRequestRide = async (driverId) => {
        try {
            // Simulate request to backend
            console.log("Requested ride from driver with ID:", driverId);
        } catch (error) {
            console.error("Error requesting ride:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", { source, destination });
       
    };

    return (
        <div className="container mx-auto mt-2 px-4">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Available Drivers:</h3>
                    <ul>
                        {drivers.map((driver) => (
                            <li key={driver._id} className="mb-4">
                                <div className="flex items-center">
                                    <div className="flex-1">
                                        <p className="text-lg font-semibold">{driver.name}</p>
                                        <p className="text-gray-600">Vehicle: {driver.vehicle}</p>
                                        <p className="text-gray-600">Seats: {driver.seats}</p>
                                    </div>
                                    <button onClick={() => handleRequestRide(driver._id)} className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">Request Ride</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
          
        </div>
    );
};

export default AskForRide;