
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './components/Header'

function App() {


  return (
  <BrowserRouter>
<Header/>
  <Routes>
    <Route path='/'element={<Home/>}/>
    <Route path='/about'element={<About/>}/>
    <Route path='/profile'element={<Profile/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/signin'element={<Signin/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
