import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    console.log('registered');
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        repeatPass: repeatPass
      })
    });

    if (response.status == 200) {
      navigate('/')
    }
  };

  return (
    <>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-2 border-primary'></div>
            <Card className='shadow px-4'>
              <Card.Body>
                <div>
                  <h2 className='fw-bold mb-2 text-center text-uppercase '>Register</h2>
                  <div className='mb-3'>
                    <Form>
                      <Form.Group className='mb-3' controlId='Name'>
                        <Form.Label className='text-center'>
                          Username
                        </Form.Label>
                        <Form.Control
                          type='text'
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          placeholder='Enter Username' />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='text-center'>
                          Email address
                        </Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter email'
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Password'
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Password'
                          value={repeatPass}
                          onChange={(event) => setRepeatPass(event.target.value)}
                        />
                      </Form.Group>
                      <div className='d-grid'>
                        <Button variant='primary' type='submit' onClick={(event) => register(event)}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-3'>
                      <p className='mb-0  text-center'>
                        Already have an account?{' '}
                        <Link to={'/login'}>Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
