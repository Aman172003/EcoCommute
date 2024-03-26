import React from 'react';

const Community = () => {
  const campaigns = [
    { id: 1, title: 'Save the Trees', description: 'Join us in planting trees across the city.', startDate: 'March 1, 2024', supporters: 250 },
    { id: 2, title: 'Reduce Plastic Usage', description: 'Help us reduce plastic waste by using eco-friendly alternatives.', startDate: 'March 5, 2024', supporters: 180 },
    { id: 3, title: 'Clean Beach Campaign', description: 'Let\'s come together to clean our beaches and protect marine life.', startDate: 'March 10, 2024', supporters: 320 },
    { id: 4, title: 'Renewable Energy Drive', description: 'Support our initiative to promote renewable energy sources for a sustainable future.', startDate: 'March 15, 2024', supporters: 400 }
  ];

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl text-custom-green font-bold mb-4">Welcome to Ecommute Community!</h2>
        <p className="text-sm md:text-lg">The Ecommute website is a hub for sustainable urban mobility, offering optimized route planning and diverse transportation options to reduce carbon emissions. With engaging campaigns and discussions, it fosters a community dedicated to eco-conscious living and environmental awareness. Through gamification and rewards, users are incentivized to adopt greener commuting practices, contributing to a healthier planet. Join Ecommute to be part of the movement towards sustainable urban living and positive environmental change.</p>
      </div>

      <div>
        <h3 className="text-2xl text-custom-green font-semibold mb-3">Current Campaigns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded p-6 flex flex-col justify-between bg-green-100 shadow-lg">
              <div className="text-center">
                <h4 className="text-2xl font-semibold mb-2">{campaign.title}</h4>
                <p className="text-gray-600 font-semibold mb-2">{campaign.description}</p>
                <p className="text-gray-600 mb-2">Start Date: {campaign.startDate}</p>
                <p className="text-gray-600 mb-4">Supporters: {campaign.supporters}</p>
              </div>
              <div className="text-center">
                {/* <button className="custom-button px-4 py-2 text-white rounded">Join Campaign</button> */}
                <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 ">Join Campaign</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-200" />
      <div>
        <h3 className="text-2xl text-custom-green font-semibold mb-3 rounded-lg">Host a Campaign</h3>
        <p className="mb-4">Got an idea for a campaign? Host it here and engage with the community!</p>
        {/* <button className="custom-button px-4 py-2 rounded ">Host a Campaign</button> */}
        <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">Host Campaign</button>
      </div>
      <hr className="my-8 border-t-2 border-gray-200" />

      <div className="mb-8">
        <h3 className="text-2xl text-custom-green font-semibold mb-3">Comments</h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-sm mb-2"
          rows="3"
          placeholder="Write your comment here..."
        ></textarea>
        {/* <button className="custom-button px-4 py-2 text-white rounded bg-custom-green hover:bg-custom-green-dark inline-block">Comment</button> */}
        <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">Comment</button>
      </div>
    </div>
  );
};

export default Community;
