import { FaTimes } from 'react-icons/fa'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import UpdateNote from './UpdateNote';
const Note = ({ note, onDelete, onToggle, }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text) {
      alert('Please add a note')
      return
    }

    onAdd({text, day, reminder})

    setText('')
    setDay('')
    setReminder(false)

  }
  return (
    <div className = {`note ${note.reminder ? 'reminder': ''}`}  onDoubleClick={()=>{onToggle(note.id)}}>
      <h3>{note.text} <FaTimes style= {{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(note.id)}/></h3>
      <p>{note.day}</p>
      <Modal show={show} onHide={handleClose}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateNote />
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
       
      </Modal>
    </div>
    
  )
}

export default Note


 