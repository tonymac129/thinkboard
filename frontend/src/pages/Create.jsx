import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
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
      await axios.post("http://localhost:5001/api/notes", {
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
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" value={title} onInput={(e) => setTitle(e.target.value)} />
      <input type="text" value={content} onInput={(e) => setContent(e.target.value)} />
      <button type="submit"></button>
    </form>
  );
}

export default Create;
