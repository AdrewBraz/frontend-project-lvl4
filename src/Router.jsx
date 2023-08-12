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
    const token = useSelector((state) => state.chatState.token)

    return (
        <BrowserRouter>
          <Routes>
          <Route path='/' element={token ? <App /> : <Login />} ></Route>
          </Routes>
        </BrowserRouter>
    )
  } 

  export default Router