import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Container,
  Card,
  Alert
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import RegisterForm from '../components/RegisterForm';

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

const initValues = {
  username: '',
  email: '',
  password: '',
  repeatPass: ''
};

export default function RegisterPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const register = async (values) => {
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.auth === true) {
          navigate('/');
        } else {
          navigate('/register');
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
                  <RegisterForm initValues={initValues} onSubmit={register} errors={errors} schema={schema} />
                  <div className='mt-3'>
                    <p className='mb-0 text-center'>
                      Already have an account?{' '}
                      <Link to='/login'>Login</Link>
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
