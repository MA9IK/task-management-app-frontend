import { Figure, Nav } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async () => {
    const response = await fetch(
      'https://test-w6wx.onrender.com/users/logout',
      {
        method: 'POST',
        credentials: 'include'
      }
    );

    if (response.status === 200) {
      navigate('/register');
      setUser(null);
    }
  };

  return (
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
      <div>{user}</div>
      <Nav>
        <Nav.Item>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}
