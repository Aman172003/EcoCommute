import React from "react";
import { useState } from "react";
import GeneralContext from "./GeneralContext";

const GeneralState = (props) => {
  const host = "http://localhost:5000";

  // these are the api calls for campaigns
  const [campaigns, setCampaigns] = useState([]);
  const [Data, setData] = useState([]);

  // get all campaigns
  const getCampaigns = async () => {
    const response = await fetch(`${host}/community/fetchallcampaigns`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setCampaigns(json);
  };

  // add campaign
  const addCampaign = async (title, date, address, description) => {
    const response = await fetch(`${host}/community/addcampaign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, date, address, description }),
    });
    // client side logic
    const campaign = await response.json();
    setCampaigns(campaigns.concat(campaign));
  };

  // delete a campaign
  const deleteCampaign = async (id) => {
    // API CALL
    const response = await fetch(`${host}/community/deletecampaign/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newCampaign = campaigns.filter((campaign) => {
      return campaign._id !== id;
    });
    setCampaigns(newCampaign);
  };

  // edit a campaign
  const editCampaign = async (id, title, date, address, description) => {
    // API CALL
    const response = await fetch(`${host}/community/updatecampaign/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, date, address, description }),
    });
    const json = await response.json();

    let newCampaigns = JSON.parse(JSON.stringify(campaigns));
    // LOGIC TO EDIT IN CLIENT
    for (let i = 0; i < newCampaigns.length; i++) {
      const element = newCampaigns[i];
      if (element._id === id) {
        newCampaigns[i].title = title;
        newCampaigns[i].description = description;
        newCampaigns[i].address = address;
        newCampaigns[i].date = date;
        break;
      }
    }
    setCampaigns(newCampaigns);
  };

  // add supporters for the community
  const addSupporter = async (id) => {
    const response = await fetch(`${host}/community/addsupporter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error("Failed to add supporter");
    }
    return await response.json();
  };

  // api call to get leaderboard
  const getLeaderboardData = async () => {
    try {
      const response = await fetch(`${host}/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setData(json);
      return json;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // api calls for updating leaderboard
  const setLeaderboardData = async (Sname, coins) => {
    try {
      const response = await fetch(`${host}/leaderboard/update-leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ Sname, coins }),
      });
      const json = await response.json();
      setData(json);
      return json;
    } catch (error) {
      console.error("Error Updating leaderboard:", error);
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        campaigns,
        setCampaigns,
        getCampaigns,
        addCampaign,
        addSupporter,
        editCampaign,
        deleteCampaign,
        Data,
        getLeaderboardData,
        setLeaderboardData,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralState;
