import React, { useEffect, useContext } from "react";
import GeneralContext from "../context/GeneralContext";

const Leaderboard = () => {
  const context = useContext(GeneralContext);
  const { Data, getLeaderboardData } = context;

  useEffect(() => {
    getLeaderboardData();
  }, []);

  const currentUserIndex = Data.findIndex(
    (entry) => entry.user === localStorage.getItem("id")
  );

  if (currentUserIndex !== -1) {
    const currentUserData = Data.splice(currentUserIndex, 1)[0];
    Data.unshift(currentUserData);
  }

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center mb-8">
      <h2 className="text-4xl text-custom-green font-bold mb-4">Leaderboard</h2>
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-100">
              <tr>
                <th className="text-center px-4 py-4 text-xs font-medium text-custom-green uppercase tracking-wider">
                  Rank
                </th>
                <th className="text-center px-4 py-4 text-xs font-medium text-custom-green uppercase tracking-wider">
                  Name
                </th>
                <th className="text-center px-4 py-4 text-xs font-medium text-custom-green uppercase tracking-wider">
                  Eco-Coins
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.map((entry, index) => (
                <tr
                  key={index}
                  className={`${
                    entry.user === localStorage.getItem("id")
                      ? "bg-gray-100 text-lime-800"
                      : ""
                  } ${
                    index !== Data.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <td className="text-center px-4 py-2 whitespace-nowrap">
                    {entry.rank}
                  </td>
                  <td className="text-center px-4 py-2 whitespace-nowrap">
                    {entry.Sname}
                  </td>
                  <td className="text-center px-4 py-2 whitespace-nowrap">
                    {entry.coins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
