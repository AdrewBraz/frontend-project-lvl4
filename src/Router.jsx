 import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate,
  } from 'react-router-dom';
  import { useEffect } from 'react';
  import axios from 'axios';
  import { useDispatch } from 'react-redux/es/exports';

  import React from 'react';
  import App from './components/App'
  import Login from './components/Login'

  import { useSelector } from 'react-redux/es/exports';
import actions from './actions';

  const Router = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.chatState.isAuth)
    useEffect(() => {
      const func = async () => {
        const { data: {accessToken} } = await axios.get('/refresh', {withCredentials: true})
        dispatch(actions.checkAuth({accessToken}))
        return accessToken
      }
      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        func()
      }
    }, [])

    return (
        <BrowserRouter>
          <Routes>
          <Route path='/' element={isAuth ? <App /> : <Login />} ></Route>
          </Routes>
        </BrowserRouter>
    )
  } 

  export default Router