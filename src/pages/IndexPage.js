import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { UserContext } from '../UserContext';
import Header from '../components/Header';
import Task from '../components/Task';
import { ModalWindow } from '../components/Modal';

export default function IndexPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [task, setTask] = useState([]);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/profile', { credentials: 'include' })
      .then(data => data.json())
      .then(data => {
        if (data.auth === true) {
          navigate('/');
          setUser(data.decoded.user);
        } else {
          navigate('/register');
        }
      }).catch(err => {
      console.log(err);
    });

    fetch('http://localhost:4000/task', { credentials: 'include' })
      .then(data => data.json())
      .then(data => {
        setTask(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <Container>
      {user && (
        <ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
          <Toast onClose={() => setShowNotification(false)} show={showNotification} delay={3000} autohide>
            <Toast.Header>
              <strong className='me-auto'>Ivan</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>Woohoo, wellcome to my app {user}!! </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Header />
      <Button variant='success' className='mt-1' onClick={() => setModalShow(true)}>Create task</Button>

      <ModalWindow
        show={modalShow}
        onHide={() => setModalShow(false)}
        head='Create task'
      />

      {task.length > 0 ? (
        <Row className='mt-5 text-center'>
          <Col>
            <div>To-do</div>
            {task
              .filter(item => item.status === 'to-do')
              .map((item, index) => {
                return <Task id={item._id} status={item.status} text={item.title} desc={item.detail} key={index} />;
              })
            }
          </Col>
          <Col>
            <div>In-progress</div>
            {task
              .filter(item => item.status === 'in-progress')
              .map((item, index) => {
                return <Task id={item._id} status={item.status} text={item.title} desc={item.detail} key={index} />;
              })
            }
          </Col>
          <Col>
            <div>Completed</div>
            {task
              .filter(item => item.status === 'completed')
              .map((item, index) => {
                return <Task id={item._id} status={item.status} text={item.title} desc={item.detail} key={index} />;
              })
            }
          </Col>
        </Row>
      ) : (
        <div>There no task</div>
      )}
    </Container>
  );
}
