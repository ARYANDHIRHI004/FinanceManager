import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './pages/WelcomePage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route path='/' element={<WelcomePage/>}/>
      </Route>
    </Routes>
  )
}

export default App