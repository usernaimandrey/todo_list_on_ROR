import React, { useState } from "react";
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import {
  useLocation, useNavigate, Link
} from 'react-router-dom';
import * as Yup from 'yup';
import router from '../../router';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Requare'),
    password: Yup.string()
      .min(2, 'Passoword is short')
      .max(50, 'Too Long!')
      .required('Requare'),
    password_confirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], 'Confirm')
      .required()
  });

  const changePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  }
  const changeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password_confirmation: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data } = await axios({
            method: 'post',
                    url: router.signUp(),
                    data: {
                      values
                    }
                  });
          auth.logIn();
          localStorage.setItem('userData', JSON.stringify({ userId: data.user_id, token: data.auth_token }));
          navigate('/', { from: location })
        } catch(e) {
          if (e.response && e.response.status == 422) {
            setErrors({
              email: 'User alredy exist'
            })
          }
        }
        
        
      }}
      >
        {({ errors, touched }) => (
          <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <Field type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" />
            {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Field type="password" name="password" className="form-control" id="password" />
            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Password Confirm</label>
            <Field type="password" name="password_confirmation" className="form-control" id="password_confirmation" />
            {errors.password_confirmation && touched.password_confirmation ? (<div>{errors.password_confirmation}</div>) : null}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <div className="m-2">
            <Link className="nav-link active" aria-current="page" to="/signin">Signin</Link>
          </div>
        </Form>
        )}
    </Formik>
    
  )
};

export default SignUp;