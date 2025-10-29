import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

function View() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const newNote = await api.get("/notes/" + id);
        setNote(newNote.data);
      } catch (error) {
        toast.error("Error:" + error);
      }
    }
    fetchNote();
  }, [id]);

  async function handleDelete() {
    try {
      await api.delete("/notes/" + id);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error:" + error);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please enter a title and content");
      return;
    }
    try {
      await api.put("/notes/" + id, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error:" + error);
    }
  }

  return (
    <div className="wrapper">
      <h1 className="welcome">Note details</h1>
      <Link to="/" className="view-home">&lt; Home</Link>
      <form onSubmit={(e) => handleSave(e)} className="create-form">
        <div className="field">
          <label>Note title</label>
          <input value={note.title} onInput={(e) => setNote({ ...note, title: e.target.value })} />
        </div>
        <div className="field">
          <label>Note content</label>
          <input value={note.content} onInput={(e) => setNote({ ...note, content: e.target.value })} />
        </div>
        <p className="field">Created on {new Date(note.createdAt).toLocaleDateString()}</p>
        <p className="field">Updated on {new Date(note.updatedAt).toLocaleDateString()}</p>
        <div className="create-btns">
          <button type="submit">Save</button>
          <button className="cancel-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default View;
