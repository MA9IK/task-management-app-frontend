import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Figure, Nav } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function IndexPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
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

  const logout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      navigate('/register')
    })
      .catch(err => {
        console.log(err)
      })
  };

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
      <header className='d-flex justify-content-between'>
        <Figure className='m-0 mt-1'>
          <Figure.Image
            className='rounded-5 m-0'
            width={50}
            height={50}
            alt='logo'
            src='https://avatars.githubusercontent.com/u/119162718?v=4'
          />
        </Figure>
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
    </Container>
  );
}
