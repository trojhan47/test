import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import Notes from "./components/Notes";
import AddNote from './components/AddNote';
function App() {

  const [showAddNote, setShowAddNote] = useState(false)
  const [showUpdModal, setUpdModal] = useState(false)

  const [notes, setNotes] = useState([])
  useEffect(()=> {
   const getNotes = async ()=> {
    const notesFromServer = await fetchNotes()
    setNotes(notesFromServer)
   }
    getNotes()
  },[])

  // Fetch notes
   const fetchNotes = async()=> {
      const res = await fetch('http://localhost:5000/notes')
      const data = await res.json()

      return data
    }
  // Fetch note
   const fetchNote = async(id)=> {
      const res = await fetch(`http://localhost:5000/notes/${id}`)
      const data = await res.json()

      return data
    }

// Add note
const addNote = async (note)=> {
  const res = await fetch('http://localhost:5000/notes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(note)
  })

  const data = await res.json()
  setNotes([...notes, data])
/* const id = Math.floor(Math.random() * 1000) + 1
const newNote = {id, ...note} 
setNotes([...notes, newNote]) */
}

//  Delete note
const deleteNote = async (id) => {
await fetch(`http://localhost:5000/notes/${id}`, {
  method: 'DELETE'
})
  setNotes(notes.filter((note) => note.id !== id));
}
  
// Update
  const updateNote = async (id, note) => {
    const noteToUpdate = await fetchNote(id)
    console.log(noteToUpdate)
  const updNote = {...noteToUpdate,
    note
  }
    const res =  await fetch(`http://localhost:5000/notes/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(updNote)
  })

  const data = await res.json()
setNotes(notes.map((note)=> note.id === id ?{...note, reminder: data.reminder} : note)) 
  }
// Toggle Reminder
const toggleReminder = async (id) => {
  const noteToToggle = await fetchNote(id)
  const updNote = {...noteToToggle,
  reminder: !noteToToggle.reminder}

  const res =  await fetch(`http://localhost:5000/notes/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(updNote)
  })

  const data = await res.json()
setNotes(notes.map((note)=> note.id === id ?{...note, reminder: data.reminder} : note)) }

    return (
      <Router>
    <div className="container">
     <Header onAdd= {()=> setShowAddNote(!showAddNote)} showAdd={showAddNote}/>
     {showAddNote &&<AddNote onAdd={addNote}/>}
     {notes.length>0 ? (<Notes notes= {notes} onDelete= {deleteNote}
            onToggle={toggleReminder} onUpdate={updateNote} />) : ('No notes To Show')}
          

    <Routes>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
