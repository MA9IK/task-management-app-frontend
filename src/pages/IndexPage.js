import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IndexPage() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState('')
  async function checkAuth() {
    const response = await fetch('http://localhost:4000/', { credentials: 'include' });

    const data = await response.json()
    if (data.auth === true) {
      navigate('/')

    } else {
      navigate('/register')
    }
  }

  useEffect(() => {
    fetch('http://localhost:4000/', {credentials: 'include'})
      .then(data => data.json())
      .then(data => {
        if (data.auth === true) {
          navigate('/')
          setUser(data.decoded.user)
        } else {
          navigate('/register')
        }
      })
  }, []);



  return (
    <div>Index page, {user}</div>
  );
}
