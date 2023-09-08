import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';

export const ModalWindow = ({ show, onHide, head }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');

  const createTask = async () => {
    try {
      const response = await fetch('https://test-w6wx.onrender.com/tasks', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          detail: desc,
          status: status
        })
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>{head}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='d-flex justify-content-center'>
          <Form.Label className='m-0'>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Title'
            style={{ width: '95%' }}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Row>
        <Row className='mt-1 d-flex justify-content-center'>
          <Form.Label className='m-0'>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            style={{ width: '95%' }}
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </Row>
        <Row className='mt-1'>
          <DropdownButton id='dropdown-basic-button' title={status}>
            <Dropdown.Item onClick={e => setStatus(e.target.innerText)}>
              to-do
            </Dropdown.Item>
            <Dropdown.Item onClick={e => setStatus(e.target.innerText)}>
              in-progress
            </Dropdown.Item>
            <Dropdown.Item onClick={e => setStatus(e.target.innerText)}>
              completed
            </Dropdown.Item>
          </DropdownButton>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={createTask}>
          createTask
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
