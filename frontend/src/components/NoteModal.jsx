
import axios from "axios";
import React, { useState, useEffect } from "react";
import './NoteModal.css';

const NoteModal = ({closeModal, addNote, currentNote, editNote}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      if (currentNote) {
          setTitle(currentNote.title);
          setDescription(currentNote.description);
      } else {
        setTitle("");  
        setDescription("");
    }
  }, [currentNote]);
        
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentNote) {
            editNote(currentNote._id, title, description)
        } else {
          addNote(title, description)
        }
       
    }
        
    return (
      <div className="modal-container">
        <div className="modal-content">
            <h2>{currentNote ? "Edit Note" : "Add New Note"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Title"
                  
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Note Description"
                  
                />
                <div className="modal-buttons">
                <button type="submit" className="add-btn">
                  {currentNote ? "Update Note" : "Add Note"}
                </button>
                </div>
            </form>
            <button className="button" onClick={closeModal}>Cancel</button>
        </div>
    </div>
    );
};
export default NoteModal;
        
        