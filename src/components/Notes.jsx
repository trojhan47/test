import Note from "./Note"
const notes = ({ notes, onDelete, onToggle, updNote , onUpdate }) => {
   return (
    <>
      {notes.map((note)=>( updNote,<Note key={note.id} note={note} onDelete= {onDelete} onToggle= {onToggle} onUpdate={onUpdate} />))}
    </>
  )
}

export default notes




