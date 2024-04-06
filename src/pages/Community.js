import React, { useState, useEffect, useContext } from "react";
import HostModal from "../components/HostModal";
import GeneralContext from "../context/GeneralContext";
import EditModal from "../components/EditModal";
import Comments from "./Comments";
import toast from "react-hot-toast";

const Community = () => {
  const context = useContext(GeneralContext);
  const {
    getCampaigns,
    campaigns,
    addSupporter,
    setCampaigns,
    deleteCampaign,
    setLeaderboardData,
  } = context;

  const [currentCampaign, setCurrentCampaign] = useState(null); // State to store the current campaign being edited

  const handleJoinCampaign = async (id) => {
    if (!localStorage.getItem("token")) {
      // Show a message if user is not signed in
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

    // Call addSupporter function to join or unjoin the campaign
    const updatedCampaign = await addSupporter(id);

    // Update the campaigns state with the updated campaign
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign._id === updatedCampaign._id) {
        return updatedCampaign;
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);

    // Show a success toast if user successfully joins the campaign
    if (updatedCampaign.supporters.includes(localStorage.getItem("id"))) {
      const temp = await setLeaderboardData(localStorage.getItem("name"), 20);
      const updatedData = await temp.find(
        (entry) => entry.user === localStorage.getItem("id")
      );
      const userCoins = updatedData.coins;
      localStorage.setItem("coins", userCoins);
      toast.success("Congratulations! You have earned 20 EcoCoins");
    } else {
      const temp = await setLeaderboardData(localStorage.getItem("name"), -20);
      const updatedData = await temp.find(
        (entry) => entry.user === localStorage.getItem("id")
      );
      const userCoins = updatedData.coins;
      localStorage.setItem("coins", userCoins);
      // Show an error toast if user unjoins the campaign
      toast.error("Oops! You have lost 20 EcoCoins");
    }
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

  const handleDeleteCampaign = async (campaignId) => {
    deleteCampaign(campaignId);
    const temp = await setLeaderboardData(localStorage.getItem("name"), -50);
    const updatedData = await temp.find(
      (entry) => entry.user === localStorage.getItem("id")
    );
    const userCoins = updatedData.coins;
    localStorage.setItem("coins", userCoins);
    toast.error("Ohh! You have lost 50 EcoCoins");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

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
                      <button
                        onClick={() => handleDeleteCampaign(campaign._id)}
                      >
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
        <HostModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
      <hr className="my-8 border-t-2 border-gray-200" />

      <Comments />
    </div>
  );
};

export default Community;
