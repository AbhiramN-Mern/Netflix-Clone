import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import WatchList from './pages/watchList/watchList'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import { WatchListProvider } from './context/watchListContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
function App() {
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in:", user)
        navigate("/")
      }else{
        console.log("user logged out")
        navigate("/login")
      }
  })
},[])
  return (
    <AuthProvider>
      <WatchListProvider>
        <div>
          <ToastContainer theme='dark' />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/player/:id' element={<Player />} />
            <Route path='/watchlist' element={<WatchList />}/>
          </Routes>
        </div>
      </WatchListProvider>
    </AuthProvider>
  )
}

export default App
