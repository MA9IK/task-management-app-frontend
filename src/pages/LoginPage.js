import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function LoginPage() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const response = await fetch('https://test-w6wx.onrender.com/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          remember: remember
        })
      });

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch('https://test-w6wx.onrender.com/profile', { credentials: 'include' })
      .then(data => data.json())
      .then(data => {
        if (data.auth === true) {
          navigate('/');
        } else {
          navigate('/login');
        }
      }).catch(err => {
      console.log(err);
    });
  }, [navigate]);


  const initialValues = {
    email: '',
    password: ''
  };

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
  });

  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xs={12}>
          <div className='border border-2 border-primary'></div>
          <Card className='shadow px-4'>
            <Card.Body>
              <div>
                <h2 className='fw-bold mb-2 text-center text-uppercase'>Login</h2>
                <div className='mb-3'>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={values => login(values)}
                    validationSchema={schema}
                  >
                    {(formik) => (
                      <Form noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className='mb-3' controlId='email'>
                          <Form.Label className='text-center'>Email address</Form.Label>
                          <Field
                            type='text'
                            name='email'
                            className={`form-control ${
                              formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                            }`}
                            placeholder='Email'
                          />
                          <ErrorMessage
                            name='email'
                            component='div'
                            className='invalid-feedback'
                          />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='password'>
                          <Form.Label className='text-center'>Password</Form.Label>
                          <Field
                            type='password'
                            name='password'
                            className={`form-control ${
                              formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                            }`}
                            placeholder='Password'
                          />
                          <ErrorMessage
                            name='password'
                            component='div'
                            className='invalid-feedback'
                          />
                        </Form.Group>
                        <div className='d-grid'>
                          <Button variant='primary' type='submit'>
                            Create Account
                          </Button>
                        </div>
                        <Form.Check
                          className='d-flex gap-1 align-items-center mt-1'
                          type={'checkbox'}
                          label={`remember me for 2 weeks`}
                          onChange={() => setRemember(!remember)}
                        />
                      </Form>
                    )}
                  </Formik>
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
  );
}