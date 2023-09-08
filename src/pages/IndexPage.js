import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { UserContext } from '../UserContext';
import Header from '../components/Header';
import Task from '../components/Task';
import { ModalWindow } from '../components/Modal';

export default function IndexPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(true);

  const fetchUserProfile = () => {
    setLoading(true);
    fetch('https://test-w6wx.onrender.com/users/profile', {
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => {
        setLoading(false);
        if (data.auth === true) {
          navigate('/');
          setUser(data.decoded.user);
        } else {
          navigate('/register');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchTasks = () => {
    fetch('https://test-w6wx.onrender.com/tasks', { credentials: 'include' })
      .then(data => data.json())
      .then(data => {
        setLoading(false);
        setTasks(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTasks();
  }, [navigate]);

  const updateTaskList = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === taskId) {
        return updatedTask;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const taskStatuses = ['to-do', 'in-progress', 'completed'];

  return (
    <Container>
      {user && (
        <ToastContainer
          position='top-end'
          className='p-3'
          style={{ zIndex: 1 }}>
          <Toast
            onClose={() => setShowWelcomeNotification(false)}
            show={showWelcomeNotification}
            delay={3000}
            autohide>
            <Toast.Header>
              <strong className='me-auto'>Ivan</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>Woohoo, welcome to my app {user}!! </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Header />
      <Button
        variant='success'
        className='mt-1'
        onClick={() => setModalVisibility(true)}>
        Create task
      </Button>

      <ModalWindow
        show={isModalVisible}
        onHide={() => setModalVisibility(false)}
        head='Create task'
      />

      {isLoading ? (
        <Spinner animation='border' role='status' className='d-flex'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : tasks.length > 0 ? (
        <Row className='mt-5 text-center'>
          {taskStatuses.map(status => (
            <Col key={status}>
              <div>{status}</div>
              {tasks
                .filter(item => item.status === status)
                .map((item, index) => (
                  <Task
                    updateTaskList={updateTaskList}
                    key={item._id}
                    task={item}
                  />
                ))}
            </Col>
          ))}
        </Row>
      ) : (
        <div className='font-monospace fs-2 text-center'>There are no tasks</div>
      )}
    </Container>
  );
}
