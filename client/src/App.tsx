import React, { lazy } from 'react'
// import * as Pages from './pages/index.ts'
import { Routes, Route } from 'react-router-dom'

const Homepage = lazy(() => import('./pages/Homepage'))
const Character = lazy(() => import('./pages/Character'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const GameRoom = lazy(() => import('./pages/GameRoom'))
const Lobby = lazy(() => import('./pages/Lobby'))
const Questions = lazy(() => import('./pages/Questions'))
const Completed = lazy(() => import('./pages/Completed'))
const Rules = lazy(() => import('./pages/Rules'))
const Logo = lazy(() => import('./components/Logo'))
// since lazy loading asynchronous its a good practice to use suspense
// to show that the page is loading.

function App() {
  return (
    <div className='smart-duck'>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route element={<Logo />}>
          <Route path='/character' element={<Character />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/login' element={<Login />} />
          <Route path='/game-room' element={<GameRoom />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/completed' element={<Completed />} />
          <Route path='/rules' element={<Rules />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
