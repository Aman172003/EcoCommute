import React, { useState } from "react";
import Modal from "../components/Modal";

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const campaigns = [
    {
      id: 1,
      title: "Save the Trees",
      description: "Join us in planting trees across the city.",
      startDate: "March 1, 2024",
      supporters: 250,
    },
    {
      id: 2,
      title: "Reduce Plastic Usage",
      description:
        "Help us reduce plastic waste by using eco-friendly alternatives.",
      startDate: "March 5, 2024",
      supporters: 180,
    },
    {
      id: 3,
      title: "Clean Beach Campaign",
      description:
        "Let's come together to clean our beaches and protect marine life.",
      startDate: "March 10, 2024",
      supporters: 320,
    },
    {
      id: 4,
      title: "Renewable Energy Drive",
      description:
        "Support our initiative to promote renewable energy sources for a sustainable future.",
      startDate: "March 15, 2024",
      supporters: 400,
    }
  ];

  const comments = [
    {
      id: 1,
      comment: "I absolutely agree! The Clean Beach Campaign is a fantastic initiative. Let's work together to protect our environment and make our beaches cleaner for everyone.",
      author: "OceanLover456",
      date: "March 21, 2024"
    },
    {
      id: 2,
      comment: "I absolutely agree! The Clean Beach Campaign is a fantastic initiative. Let's work together to protect our environment and make our beaches cleaner for everyone.",
      author: "OceanLover456",
      date: "March 22, 2024"
    }
  ];

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl text-custom-green font-bold mb-4">
          Welcome to Ecommute Community!
        </h2>
        <p className="text-sm md:text-lg">
          The Ecommute website is a hub for sustainable urban mobility, offering
          optimized route planning and diverse transportation options to reduce
          carbon emissions. With engaging campaigns and discussions, it fosters
          a community dedicated to eco-conscious living and environmental
          awareness. Through gamification and rewards, users are incentivized to
          adopt greener commuting practices, contributing to a healthier planet.
          Join Ecommute to be part of the movement towards sustainable urban
          living and positive environmental change.
        </p>
      </div>

      <div>
        <h3 className="text-2xl text-custom-green font-semibold mb-3">
          Current Campaigns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="rounded p-6 flex flex-col justify-between bg-green-100 shadow-lg"
            >
              <div className="text-center">
                <h4 className="text-2xl font-semibold mb-2">
                  {campaign.title}
                </h4>
                <p className="text-gray-600 font-semibold mb-2">
                  {campaign.description}
                </p>
                <p className="text-gray-600 mb-2">
                  Start Date: {campaign.startDate}
                </p>
                {campaign.supporters && (
                  <p className="text-gray-600 mb-4">
                    Supporters: {campaign.supporters}
                  </p>
                )}
              </div>
              <div className="text-center">
                <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 ">
                  Join Campaign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-200" />
      <div>
        <h3 className="text-2xl text-custom-green font-semibold mb-3 rounded-lg">
          Host a Campaign
        </h3>
        <p className="mb-4">
          Got an idea for a campaign? Host it here and engage with the
          community!
        </p>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
        >
          Host Campaign
        </button>
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
      <hr className="my-8 border-t-2 border-gray-200" />

      <div className="mb-8">
        <h3 className="text-2xl text-custom-green font-semibold mb-3">
          Comments
        </h3>
        
        <textarea
          className="w-full p-2 border border-gray-300 rounded-sm mb-2"
          rows="3"
          placeholder="Write your comment here..."
        ></textarea>
        <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4">
          Comment
        </button>
        {comments.map((comment) => (
          <div key={comment.id} className="rounded p-4 mb-4 shadow-lg bg-gray-100 rounded">
            <p className="text-gray-800">{comment.comment}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600 text-sm">Posted by: {comment.author}</span>
              <span className="text-gray-600 text-sm">{comment.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
