import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getNote(req, res) {
  try {
    const notes = await Note.findById(req.params.id);
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "ERROR 404 NOT FOUND!!!" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const updatedNote = await Note.findByIdAndDelete(req.params.id);
    if (!updatedNote) {
      return res.status(404).json({ message: "ERROR 404 NOT FOUND!!!" });
    }
    res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}
