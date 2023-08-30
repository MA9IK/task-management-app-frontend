import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Figure, Nav } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { UserContext } from '../UserContext';
import Header from '../components/Header';

export default function IndexPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/', { credentials: 'include' })
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
    </Container>
  );
}
