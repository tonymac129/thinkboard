import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes/");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error(error);
        if (error.response?.status == 429) {
          setIsRateLimited(true);
        }
        toast.error(error.response ? "Error: " + error.response.status : "Internal server error");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Error deleting note, plz try again later");
    }
  }

  return (
    <div className="wrapper">
      <div className="wrapper-top">
        <h1 className="welcome">Welcome to Thinkboard!</h1>
        <Link to="/create" className="create-btn">
          + Create note
        </Link>
      </div>
      {isRateLimited && <div>yo u sent too many requests</div>}
      {loading ? (
        <div className="message">Loading...</div>
      ) : (
        <div className="notes">
          {notes.length > 0 ? (
            notes.map((note, i) => {
              return (
                <Link to={`/note/${note._id}`} className="note" key={i}>
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>
                  <div>
                    Created {new Date(note.createdAt).toLocaleDateString()}
                    <br />
                    Updated {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="note-btns">
                    <button>Edit</button>
                    <button onClick={(e) => handleDelete(e, note._id)}>Delete</button>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="message">No notes added!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
