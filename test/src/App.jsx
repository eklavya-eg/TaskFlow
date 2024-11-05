import { useState, lazy } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"

const home = lazy(()=>import("./components/home"))
const register = lazy(()=>import("./components/register"))
const login = lazy(()=>import("./components/login"))
const tasks = lazy(()=>import("./components/tasks"))

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}

export default App
