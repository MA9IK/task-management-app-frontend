import React, { useEffect, useState } from 'react';
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Alert
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username cannot be most than 15 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  repeatPass: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function RegisterPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    repeatPass: ''
  };

  const register = async values => {
    try {
      const response = await fetch(
        'https://test-w6wx.onrender.com/users/register',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      );

      if (response.status === 200) {
        navigate('/');
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch('https://test-w6wx.onrender.com/users/profile', {
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => {
        if (data.auth === true) {
          navigate('/');
        } else {
          navigate('/users/register');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xs={12}>
          <div className='border border-2 border-primary'></div>
          <Card className='shadow px-4'>
            <Card.Body>
              <div>
                <h2 className='fw-bold mb-2 text-center text-uppercase'>
                  Register
                </h2>
                <div className='mb-3'>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={values => register(values)}
                    validationSchema={schema}>
                    {formik => (
                      <Form noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className='mb-3' controlId='username'>
                          <Form.Label className='text-center'>
                            Username
                          </Form.Label>
                          <Field
                            type='text'
                            name='username'
                            className={`form-control ${
                              formik.touched.username && formik.errors.username
                                ? 'is-invalid'
                                : ''
                            }`}
                            placeholder='Username'
                          />
                          <ErrorMessage
                            name='username'
                            component='div'
                            className='invalid-feedback'
                          />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='email'>
                          <Form.Label className='text-center'>
                            Email address
                          </Form.Label>
                          <Field
                            type='email'
                            name='email'
                            className={`form-control ${
                              formik.touched.email && formik.errors.email
                                ? 'is-invalid'
                                : ''
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
                          <Form.Label>Password</Form.Label>
                          <Field
                            type='password'
                            name='password'
                            className={`form-control ${
                              formik.touched.password && formik.errors.password
                                ? 'is-invalid'
                                : ''
                            }`}
                            placeholder='Password'
                          />
                          <ErrorMessage
                            name='password'
                            component='div'
                            className='invalid-feedback'
                          />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='repeatPass'>
                          <Form.Label>Confirm Password</Form.Label>
                          <Field
                            type='password'
                            name='repeatPass'
                            className={`form-control ${
                              formik.touched.repeatPass &&
                              formik.errors.repeatPass
                                ? 'is-invalid'
                                : ''
                            }`}
                            placeholder='Repeat password'
                          />
                          <ErrorMessage
                            name='repeatPass'
                            component='div'
                            className='invalid-feedback'
                          />
                        </Form.Group>

                        <div className='d-grid'>
                          <Button variant='primary' type='submit'>
                            Create Account
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {errors.length > 0 &&
                    errors.map((error, index) => (
                      <Alert variant='danger' className='mt-3'>
                        <p key={index} className='mb-0'>
                          {error}
                        </p>
                      </Alert>
                    ))}

                  <div className='mt-3'>
                    <p className='mb-0 text-center'>
                      Already have an account? <Link to='/login'>Login</Link>
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
