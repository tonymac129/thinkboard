import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useNavigate } from "react-router";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!");
    }
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create note, please try again.");
    }
    setTitle("");
    setContent("");
  }

  return (
    <div className="wrapper">
      <h1 className="welcome">Create new note</h1>
      <form className="create-form" onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Note title" type="text" value={title} onInput={(e) => setTitle(e.target.value)} />
        <input placeholder="Note content" type="text" value={content} onInput={(e) => setContent(e.target.value)} />
        <div className="create-btns">
          <button type="submit">Create note</button>
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
