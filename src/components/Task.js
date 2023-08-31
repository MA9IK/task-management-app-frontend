import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

export default function Task({ text, desc, id, status }) {
  const [show, setShow] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newDesc, setNewDesc] = useState(desc);
  const [newStatus, setNewStatus] = useState(status);
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeTask = async () => {
    try {
      const response = await fetch(`https://task-management-app-frontend.vercel.app/task/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.status === 200) {
        console.log('Task deleted successfully.');
        handleClose()
        window.location.reload()
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const updateTask = async () => {
    try {
      const response = await fetch(`https://task-management-app-frontend.vercel.app/task/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({
          title: newText,
          detail: newDesc,
          status: newStatus
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Task updated successfully.');
        handleClose()
        window.location.reload()
      } else {
        console.error('Failed to update task.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div
        className=' w-100 border mt-1 rounded-1 shadow-sm text-break task'
        onClick={handleShow}>
        {text}
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit task</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Label column sm='2'>
            Title
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            value={newText}
            onChange={(e) => {
              setNewText(e.target.value);
            }}
            className='mb-4'
          />
          <Form.Label column sm='2'>
            Description
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            value={newDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
          />
          <DropdownButton id='dropdown-basic-button' title={newStatus || 'Choose status'} className='mt-2'>
            <Dropdown.Item onClick={(e) => setNewStatus('to-do')}>to-do</Dropdown.Item>
            <Dropdown.Item onClick={(e) => setNewStatus('in-progress')}>in-progress</Dropdown.Item>
            <Dropdown.Item onClick={(e) => setNewStatus('completed')}>completed</Dropdown.Item>
          </DropdownButton>
          <Button variant='success' className='mt-3' onClick={updateTask}>
            Submit
          </Button>
          <Button variant='danger' className='mt-3 ms-5' onClick={removeTask}>
            Delete task
          </Button>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}