import React, { useContext, useEffect, useState, useRef } from "react";
import GeneralContext from "../context/GeneralContext";

const EditModal = ({ isEditModalOpen, editToggleModal, currentCampaign }) => {
  const refClose = useRef(null);
  const context = useContext(GeneralContext);
  const { editCampaign } = context;

  const [editedCampaign, setEditedCampaign] = useState({
    _id: "",
    title: "",
    date: "",
    address: "",
    description: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    editCampaign(
      editedCampaign._id,
      editedCampaign.title,
      editedCampaign.date,
      editedCampaign.address,
      editedCampaign.description
    );
    refClose.current.click();
  };

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    if (currentCampaign) {
      const formattedDate = new Date(currentCampaign.date)
        .toISOString()
        .split("T")[0];
      setEditedCampaign({
        _id: currentCampaign._id,
        title: currentCampaign.title,
        date: formattedDate,
        address: currentCampaign.address,
        description: currentCampaign.description,
      });
    }
  }, [isEditModalOpen, currentCampaign]);

  const onChange = (e) => {
    setEditedCampaign({ ...editedCampaign, [e.target.name]: e.target.value });
  };
  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden={!isEditModalOpen}
      className={`${
        isEditModalOpen ? "" : "hidden"
      } fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden z-50`}
      style={{
        backdropFilter: isEditModalOpen ? "blur(4px)" : "none",
        transition: "backdrop-filter 0.3s ease",
      }}
    >
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-green-100">
            <h3 className="text-xl font-semibold text-gray-900">
              Update campaign details
            </h3>
            <button
              onClick={editToggleModal}
              ref={refClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-green-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form onSubmit={handleClick} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  value={editedCampaign.title}
                  type="text"
                  name="title"
                  id="title"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                  placeholder="Enter the title"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Date
                </label>
                <input
                  type="date"
                  value={editedCampaign.date}
                  name="date"
                  onChange={onChange}
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editedCampaign.address}
                  onChange={onChange}
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                  placeholder="Enter the address"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedCampaign.description}
                  id="description"
                  onChange={onChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none focus:ring-gray-900 focus:border-gray-900"
                  placeholder="Write campaign description here"
                  minLength={25}
                  style={{ height: "163px" }}
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
