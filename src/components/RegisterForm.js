import { ErrorMessage, Field, Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';
import React from 'react';


const ErrorMessages = ({ errors }) => (
  <>
    {errors.map((error, index) => (
      <Alert variant='danger' className='mt-3' key={index}>
        <p className='mb-0'>{error}</p>
      </Alert>
    ))}
  </>
);
const RegisterForm = ({ onSubmit, errors, schema, initValues }) => (
  <Formik
    initialValues={initValues}
    onSubmit={onSubmit}
    validationSchema={schema}
  >
    {(formik) => (
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

        <ErrorMessages errors={errors} />
      </Form>
    )}
  </Formik>
);

export default RegisterForm;