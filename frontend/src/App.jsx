import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './stores/useAuthStore'
import { Loader2Icon } from 'lucide-react'

const App = () => {
  const {authUser, getCurrentUser, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    getCurrentUser()
  },[])

  if(isCheckingAuth){
    return <div  className='h-screen flex justify-center items-center'>
      <Loader2Icon className='animate-spin'/>
    </div>
  }

  return (
    <>
      <Toaster/>
      <Routes>
      <Route path='/' element={<Layout/>}>
          <Route path='/' element={!authUser ? <WelcomePage/> : <HomePage/>}/>
          <Route path='/login' element={!authUser?<LoginPage/>: <Navigate to={'/'}/>}/>
          <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to={'/'}/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App