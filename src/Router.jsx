 import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate,
  } from 'react-router-dom';
  import { useEffect } from 'react';
  import axios from './http';
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
        const { data: {accessToken, refreshToken, user, chat, chatList, messageList} } = await axios.get('/refresh', {withCredentials: true})
        dispatch(actions.checkAuth({accessToken}))
        dispatch(actions.loginUser({ user, refreshToken, accessToken, chat, chatList, messageList}))
        localStorage.setItem('token', accessToken)
      }
      if(localStorage.getItem('token')){
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