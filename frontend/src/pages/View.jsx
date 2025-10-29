import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function View() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const newNote = await axios.get("http://localhost:5001/api/notes/" + id);
        setNote(newNote.data);
      } catch (error) {
        toast.error("Error:" + error);
      }
    }
    fetchNote();
  }, [id]);

  async function handleDelete() {
    try {
      await axios.delete("http://localhost:5001/api/notes/" + id);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error:" + error);
    }
  }

  async function handleSave() {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please enter a title and content");
      return;
    }
    try {
      await axios.put("http://localhost:5001/api/notes/" + id, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error:" + error);
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <input value={note.title} onInput={(e) => setNote({ ...note, title: e.target.value })} />
      <input value={note.content} onInput={(e) => setNote({ ...note, content: e.target.value })} />
      <p>Created on {new Date(note.createdAt).toLocaleDateString()}</p>
      <p>Updated on {new Date(note.updatedAt).toLocaleDateString()}</p>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default View;
