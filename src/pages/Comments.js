import React, { useEffect, useState } from "react";

const Comments = () => {
  const host = "http://localhost:5000";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    content: "",
    date: "",
    author: "",
  });
  // get all comments
  const getComments = async () => {
    const response = await fetch(`${host}/community/fetchallcomments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setComments(json);
  };

  // add comment
  const addComment = async (content, date, author) => {
    const response = await fetch(`${host}/community/addcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ content, date, author }),
    });
    // client side logic
    const comment = await response.json();
    setComments(comments.concat(comment));
  };

  // delete a campaign
  const deleteComment = async (id) => {
    // API CALL
    const response = await fetch(`${host}/community/deletecomment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newComment = comments.filter((comment) => {
      return comment._id !== id;
    });
    setComments(newComment);
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleClick = (e) => {
    if (localStorage.getItem("token")) {
      e.preventDefault();
      const currentDate = new Date();
      const year = String(currentDate.getFullYear());
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      newComment.date = formattedDate;
      newComment.author = localStorage.getItem("name");
      console.log(newComment);
      if (newComment.content.trim().length > 0) {
        addComment(newComment.content, newComment.date, newComment.author);
        setNewComment({
          content: "",
          author: "",
          date: "",
        });
      } else {
        setNewComment({
          content: "",
          author: "",
          date: "",
        });
      }
    } else {
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
      overlay.innerHTML = `<p style='color: white; font-size: 24px;'>You are not signed in. Please <a href="/login" style='color: green; cursor: pointer;'>Sign in</a> to Comment.</p>`;
      document.body.appendChild(overlay);
    }
  };
  const onChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="mb-8">
      <h3 className="text-2xl text-custom-green font-semibold mb-3">
        Comments
      </h3>

      <textarea
        name="content"
        value={newComment.content}
        onChange={onChange}
        id="contentInput"
        className="w-full p-2 border border-gray-300 rounded-sm mb-2"
        rows="3"
        placeholder="Write your comment here..."
        required
      ></textarea>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4"
      >
        Comment
      </button>

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="rounded p-4 mb-4 shadow-lg bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div className="mb-2">
              <p className="text-gray-800">{comment.content}</p>
            </div>
            <div>
              {/* Icon for deleting */}
              {localStorage.getItem("id") === comment.user && (
                <button onClick={() => deleteComment(comment._id)}>
                  <i className="fas fa-trash text-green-800 hover:text-green-700"></i>
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600 text-sm">
              Posted by: {comment.author}
            </span>
            <span className="text-gray-600 text-sm">
              {formatDate(comment.date)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
