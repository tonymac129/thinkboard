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
    <div>
      <Link to="/create">Create note</Link>
      {isRateLimited && <div>yo u sent too many requests</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {notes.map((note, i) => {
            return (
              <div>
                <Link to={`/note/${note._id}`} key={i}>
                  {note.title}
                  <br />
                  {note.content}
                  <br />
                  {new Date(note.createdAt).toLocaleDateString()}
                  <br />
                  {new Date(note.updatedAt).toLocaleDateString()}
                  <br />
                  <button onClick={(e) => handleDelete(e, note._id)}>Delete</button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
