import React, { lazy } from 'react'
// import * as Pages from './pages/index.ts'
import { Routes, Route } from 'react-router-dom'

const Homepage = lazy(() => import('./pages/homepage/Homepage'))
const Character = lazy(() => import('./pages/character/Character'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'))
const Login = lazy(() => import('./pages/login/Login'))
const GameRoom = lazy(() => import('./pages/gameRoom/GameRoom'))
const Lobby = lazy(() => import('./pages/lobby/Lobby'))
const Questions = lazy(() => import('./pages/questions/Questions'))
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
        </Route>
      </Routes>
    </div>
  )
}

export default App
