import React, { useState } from "react";
import passenger from "../assets/passenger.jpg";

const AskForRide = () => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [drivers] = useState([
        { _id: 1, name: "John Doe", vehicle: "Toyota Camry", seats: 4 },
        { _id: 2, name: "Jane Smith", vehicle: "Honda Civic", seats: 3 },
        { _id: 3, name: "Alice Johnson", vehicle: "Ford Explorer", seats: 5 },
    ]);
    const [showDrivers, setShowDrivers] = useState(false);

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
        setShowDrivers(!showDrivers); // Toggle showDrivers state
    };

    return (
        <div className="container mx-auto mt-2 px-4">
            <div className="flex justify-center items-center mb-8">
                <form onSubmit={handleSubmit} className="flex-1 mr-8">
                    <h2 className="text-3xl font-semibold mb-4 text-custom-green">Ask For Ride</h2>
                    <div className="mb-4">
                        <label htmlFor="source" className="block text-lg font-semibold mb-2">Source:</label>
                        <input type="text" id="source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Enter source" className="w-full px-4 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="destination" className="block text-lg font-semibold mb-2">Destination:</label>
                        <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" className="w-full px-4 py-2 border rounded" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">{showDrivers ? "Hide Drivers" : "Available Drivers"}</button>
                </form>
                <div className="flex-1 md:block hidden">
                    <img src={passenger} alt="Image" className="w-full h-auto" />
                </div>
            </div>
            {showDrivers && (
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
            )}
        </div>
    );
};

export default AskForRide;
