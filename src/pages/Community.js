import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import CampaignContext from "../context/CampaignContext";
import EditModal from "./EditModal";

const Community = () => {
  const context = useContext(CampaignContext);
  const {
    getCampaigns,
    campaigns,
    addSupporter,
    setCampaigns,
    deleteCampaign,
  } = context;

  const [currentCampaign, setCurrentCampaign] = useState(null); // State to store the current campaign being edited

  const handleJoinCampaign = async (id) => {
    if (!localStorage.getItem("token")) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = "9999";
      overlay.innerHTML = `<p style='color: white; font-size: 24px;'>You are not signed in. Please <a href="/login" style='color: green; cursor: pointer;'>Sign in</a> to join a campaign.</p>`;
      document.body.appendChild(overlay);
      return;
    }
    const updatedCampaign = await addSupporter(id);
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign._id === updatedCampaign._id) {
        return updatedCampaign;
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const editToggleModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleHostCampaign = () => {
    if (!localStorage.getItem("token")) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = "9999";
      overlay.innerHTML = `<p style='color: white; font-size: 24px;'>You are not signed in. Please <a href="/login" style='color: green; cursor: pointer;'>Sign in</a> to host a campaign.</p>`;

      document.body.appendChild(overlay);
    } else {
      toggleModal();
    }
  };

  const handleEditCampaign = (campaign) => {
    setCurrentCampaign(campaign);
    editToggleModal();
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const comments = [
    {
      id: 1,
      comment:
        "I absolutely agree! The Clean Beach Campaign is a fantastic initiative. Let's work together to protect our environment and make our beaches cleaner for everyone.",
      author: "OceanLover456",
      date: "March 21, 2024",
    },
    {
      id: 2,
      comment:
        "I absolutely agree! The Clean Beach Campaign is a fantastic initiative. Let's work together to protect our environment and make our beaches cleaner for everyone.",
      author: "OceanLover456",
      date: "March 22, 2024",
    },
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
          {campaigns &&
            campaigns.map((campaign) => (
              <div
                key={campaign._id} // Unique key prop for the top-level div
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
                    Start Date: {formatDate(campaign.date)}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Supporters: {campaign.supporters?.length}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    {/* Icon for editing */}
                    {localStorage.getItem("id") === campaign.user && (
                      <button onClick={() => handleEditCampaign(campaign)}>
                        <i className="fas fa-edit text-green-800 hover:text-green-700"></i>
                      </button>
                    )}

                    <EditModal
                      isEditModalOpen={isEditModalOpen}
                      editToggleModal={editToggleModal}
                      currentCampaign={currentCampaign}
                    />
                  </div>
                  {/* join button */}
                  <div className="text-center">
                    <button
                      onClick={() => handleJoinCampaign(campaign._id)}
                      className={`px-4 py-2 rounded-lg ${
                        campaign.supporters.includes(localStorage.getItem("id"))
                          ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                          : "bg-green-800 text-white hover:bg-green-700"
                      }`}
                    >
                      {campaign.supporters.includes(localStorage.getItem("id"))
                        ? "Disjoin Campaign"
                        : "Join Campaign"}
                    </button>
                  </div>

                  {/* Delete icons */}
                  <div>
                    {/* Icon for deleting */}
                    {localStorage.getItem("id") === campaign.user && (
                      <button onClick={() => deleteCampaign(campaign._id)}>
                        <i className="fas fa-trash text-green-800 hover:text-green-700"></i>
                      </button>
                    )}
                  </div>
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
        {/* <button className="custom-button px-4 py-2 rounded ">Host a Campaign</button> */}
        <button
          onClick={handleHostCampaign}
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
          <div
            key={comment.id}
            className="rounded p-4 mb-4 shadow-lg bg-gray-100"
          >
            <p className="text-gray-800">{comment.comment}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600 text-sm">
                Posted by: {comment.author}
              </span>
              <span className="text-gray-600 text-sm">{comment.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
