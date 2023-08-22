 import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate,
  } from 'react-router-dom';
  import React from 'react';
  import App from './components/App'
  import Login from './components/Login'

  import { useSelector } from 'react-redux/es/exports';

  const Router = () => {
    const isAuth = useSelector((state) => state.chatState.isAuth)

    return (
        <BrowserRouter>
          <Routes>
          <Route path='/' element={isAuth ? <App /> : <Login />} ></Route>
          </Routes>
        </BrowserRouter>
    )
  } 

  export default Router