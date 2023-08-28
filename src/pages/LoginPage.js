import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    console.log('login');
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (response.status == 200) {
      navigate('/')
    }
  };

  return (
    <>
      <Container>
        <Container>
          <Row className='vh-100 d-flex justify-content-center align-items-center'>
            <Col md={8} lg={6} xs={12}>
              <div className='border border-2 border-primary'></div>
              <Card className='shadow px-4'>
                <Card.Body>
                  <div>
                    <h2 className='fw-bold mb-2 text-center text-uppercase'>Login</h2>
                    <div className='mb-3'>
                      <Form>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                          <Form.Label className='text-center'>
                            Email address
                          </Form.Label>
                          <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email || ''}
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
                            value={password || ''}
                            onChange={(event) => setPassword(event.target.value)}
                          />
                        </Form.Group>
                        <div className='d-grid'>
                          <Button variant='primary' type='submit' onClick={(event) => login(event)}>
                            Create Account
                          </Button>
                        </div>
                      </Form>
                      <div className='mt-3'>
                        <p className='mb-0  text-center'>
                          Don't have an account?{' '}
                          <Link to={'/register'}>Register</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}