import React from "react";
// @ts-check
import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import routes from '../routes';
import actions from '../actions';

const Login = () => {
    const dispatch = useDispatch();

    const generateOnSubmit = () => async (values) => {
        const { userName, password } = values;
        try {
          const data = { attributes: { userName, password } };
          await axios.post(routes.login(), { data });
        } catch (e) {
          throw new Error('Something went wrong');
        }
        dispatch(actions.modalStateClose());
      };

    const form = useFormik({
        onSubmit: generateOnSubmit(),
        initialValues: { userName: '', password: '' },
        validateOnBlur: false,
      });

    return (
        <>
        <form className="form-inline mb-3" onSubmit={form.handleSubmit}>
          <div className="input-group flex-row w-50">
            <input type="text" name="userName" placeholder='Your user Name' onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.userName} className="form-control" />
            <input type="password" name="password" placeholder='Your password' onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.password} className="form-control" />
            <div className="input-group-prepend">
              <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
                Login
              </button>
            </div>
          </div>
        </form>
        </>
    )
}

export default Login;