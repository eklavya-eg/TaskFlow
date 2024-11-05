import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Stats from './pages/Stats'
import Login from './pages/login'
import Register from './pages/Register'
import Task from './pages/Tasks'
import About from './pages/About'
import { useRecoilValue } from 'recoil'
import { auth } from './states/atoms/auth'
import DefaultPage from './pages/DefaultPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const navigate = useNavigate()
  const {token, username} = useRecoilValue(auth)
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRoute element={Stats} />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/flow' element={<ProtectedRoute element={Task} />} />
      <Route path='/about' element={<ProtectedRoute element={About} />} />
    </Routes>
    </>
  )
}

export default App
