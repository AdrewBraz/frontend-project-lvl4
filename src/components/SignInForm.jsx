import React from "react";
// @ts-check
import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';

import routes from '../routes';
import actions from '../actions';
import { userSchema } from "../validationSchemas";

const SignInForm = (props) => {
    const cardStyle = {
      marginTop: "-100px",
      background: "hsla(0, 0%, 100%, 0.8)",
      backdropFilter: "blur(30px)"
    }

    const backgroundStyle = {
      backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
      height: "300px"
    }
    const dispatch = useDispatch();

    const generateOnSubmit = () => async (values) => {
        const { userName, password } = values;
        try {
          const data = { attributes: { userName, password } };
          await axios.post(routes.signIn(props.path), { data });
        } catch (e) {
            console.log(e)
          throw new Error('Something went wrong');
        }
        dispatch(actions.modalStateClose());
      };

    const form = useFormik({
        onSubmit: generateOnSubmit(),
        initialValues: { userName: '', password: '' },
        validateOnBlur: false,
        validationSchema: userSchema
      });

    return (
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="fw-bold mb-5">{props.path === 'registration' ? 'Sign In Now' : 'Login Now'}</h2>
                    <form onSubmit={form.handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                          <input type="text" name="userName" placeholder='Your user Name' onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.userName} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                          <input type="password" name="password" placeholder='Your password' onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.password} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
                        {form.isSubmitting ? <Spinner animation="border" /> : 'Sign In'}
                      </button>
                    </form>
                      {form.touched.userName && form.errors.useName || form.errors.password ? (
                      <Alert variant="danger">{form.errors.userName} {form.errors.password}</Alert>
                       ) : null}
                  </div>
                </div>
    )
}

export default SignInForm;