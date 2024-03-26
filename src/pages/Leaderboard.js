import React from 'react';

const Leaderboard = () => {
  const Data = [
    { rank: 1, name: 'abc', score: 1000 },
    { rank: 2, name: 'def', score: 950 },
    { rank: 3, name: 'ghi', score: 850 },
    { rank: 4, name: 'klm', score: 750 },
    { rank: 5, name: 'nop', score: 720 },
    { rank: 6, name: 'qrs', score: 670 },
    { rank: 7, name: 'tuv', score: 600 }
  ];
  const loggedInUser = 'def';

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center mb-8">
      <h2 className="text-4xl text-custom-green font-bold mb-4">Leaderboard</h2>
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-100">
              <tr>
                <th className="text-center px-4 py-4 text-xs font-medium text-custom-green uppercase tracking-wider">Rank</th>
                <th className="text-center px-4 py-4 text-xs font-medium text-custom-green uppercase tracking-wider">Name</th>
                <th className="text-center px-4 py-4 text-xs font-medium text-custom-green uppercase tracking-wider">Eco-Coins</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((entry, index) => (
                <tr key={index} className={`${entry.name === loggedInUser ? 'bg-gray-100' : ''} ${index !== Data.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <td className="text-center px-4 py-2 whitespace-nowrap">{entry.rank}</td>
                  <td className="text-center px-4 py-2 whitespace-nowrap">{entry.name}</td>
                  <td className="text-center px-4 py-2 whitespace-nowrap">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
