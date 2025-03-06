
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import NoteCard from '../components/NoteCard';
import './Home.css';
import axios from 'axios';
import {toast} from 'react-toastify'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filteredNotes, setFilteredNote] = useState([]);

    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null)
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        setFilteredNote(
            notes.filter((note) => 
               note.title.toLowerCase().includes(query.toLowerCase()) ||
               note.description.toLowerCase().includes(query.toLowerCase())
            )
        )
     }, [query, notes]);


    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login, user not existing");
            return;
        }
            const { data } = await axios.get('http://localhost:5000/api/note', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setNotes(data.notes); 
        } catch (error) {
            console.log("Error fetching notes:", error);

            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                toast.error("Please login, user not existing");
                localStorage.removeItem("token"); // Clear invalid token
                setTimeout(() => {
                    window.location.href = "/login"; // Redirect to login page
                }, 2000);
        }
    };
}


    const closeModal = () => {
        setModalOpen(false);
        setCurrentNote(null);
    };

    const onEdit = (note) => {
        setCurrentNote(note)
        setModalOpen(true) 
    }

    const addNote = async (title, description) => {
        console.log("Adding note:", title, description);
        try {
            let response;
            if (currentNote) {
                response = await axios.put(
                    `http://localhost:5000/api/note/${currentNote._id}`,
                    { title, description },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
        } else {
             response = await axios.post(
                'http://localhost:5000/api/note/add',
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }); 
        }

        console.log("Server Response:", response.data);

        if (response.data.success) {
            toast.success("Note added successfully!");
            
            closeModal();
            fetchNotes(); 
            
 
            
            
           }
       } catch (error) {
        console.log("Error adding note:", error);
       }
    };

    const deleteNote = async (id) => {
        try {
            const response = await axios.delete(
              `http://localhost:5000/api/note/${id}`,
              {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
               }); 
               if (response.data.success) {
                   toast.success("Note deleted successfully!")
                fetchNotes(); 
                    
                   
                }
            } catch (error) {
              console.log("Error adding note:", error);
            }
    }

    const editNote = async (id, title, description) => {
        try {
            const response = await axios.put(
              `http://localhost:5000/api/note/${id}`,
              { title, description },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
               }); 
               if (response.data.success) {
                    toast.success("Note edited successfully!")
                    fetchNotes(); 
                   closeModal();
                }
            } catch (error) {
              console.log("Error adding note:", error);
            }
        }


    return (
        <div>
            <Navbar setQuery= {setQuery}/>
            <div className="notes-container">
                { filteredNotes.length > 0 ? filteredNotes.map((note) => (
                        <NoteCard key={note._id} note={note} 
                        onEdit={onEdit}
                        deleteNote={deleteNote}
                        />
                )) : <p>no notes</p>}
                
            </div>
            

            <button onClick={() => setModalOpen(true)} className="floating-button">
                +
            </button>
            {isModalOpen && (<NoteModal 
            closeModal={closeModal} 
            addNote={addNote} 
            currentNote={currentNote} 
            editNote={editNote}
            deleteNote={deleteNote}
            />)}
        </div>
    );
};

export default Home;




