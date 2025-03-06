
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./NoteCard.css"; 

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="note-card">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-description">{note.description}</p>

      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => deleteNote(note._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;

