import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'

const App = () => {

  const authUser = false;

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route path='/' element={!authUser ? <WelcomePage/> : <HomePage/>}/>
          <Route path='/login' element={!authUser?<LoginPage/>: <Navigate to={'/'}/>}/>
          <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to={'/'}/>}/>
      </Route>
    </Routes>
  )
}

export default App