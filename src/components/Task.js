import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Task({ task, updateTaskList }) {
  const [show, setShow] = useState(false);
  const [newText, setNewText] = useState(task.title);
  const [newDesc, setNewDesc] = useState(task.detail);
  const [newStatus, setNewStatus] = useState(task.status);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeTask = async () => {
    try {
      const response = await fetch(
        `https://test-w6wx.onrender.com/tasks/${task._id}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );

      if (response.status === 200) {
        console.log('Task deleted successfully.');
        handleClose();

        updateTaskList(task._id, null);
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateTask = async () => {
    try {
      const response = await fetch(
        `https://test-w6wx.onrender.com/tasks/${task._id}`,
        {
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
        }
      );

      if (response.status === 200) {
        console.log('Task updated successfully.');
        handleClose();

        const updatedTask = {
          ...task,
          title: newText,
          detail: newDesc,
          status: newStatus
        };

        updateTaskList(task._id, updatedTask);
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
        {task.text}
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
            onChange={e => {
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
            onChange={e => {
              setNewDesc(e.target.value);
            }}
          />
          <DropdownButton
            id='dropdown-basic-button'
            title={newStatus || 'Choose status'}
            className='mt-2'>
            <Dropdown.Item onClick={e => setNewStatus('to-do')}>
              to-do
            </Dropdown.Item>
            <Dropdown.Item onClick={e => setNewStatus('in-progress')}>
              in-progress
            </Dropdown.Item>
            <Dropdown.Item onClick={e => setNewStatus('completed')}>
              completed
            </Dropdown.Item>
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
