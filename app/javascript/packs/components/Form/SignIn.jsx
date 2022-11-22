import React, { useState } from "react";
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import {
  useLocation, useNavigate, Link
} from 'react-router-dom';
import * as Yup from 'yup';
import router from "../../router";
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Requare'),
    password: Yup.string()
      .required('Requare'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data } = await axios({
            method: 'post',
                    url: router.signIn(),
                    data: {
                      values
                    }
                  });
            auth.logIn();
            localStorage.setItem('userData', JSON.stringify({ userId: data.user_id, token: data.auth_token }));
            navigate('/', { from: location })
        } catch(e) {
          if (e.response && e.response.status == 404) {
            setErrors({
              email: 'Check login',
              password: 'Check password'
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
          <button type="submit" className="btn btn-primary">Submit</button>
          <div className="m-2">
            <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
          </div>
        </Form>
        )}
    </Formik>
    
  )
};

export default SignIn;