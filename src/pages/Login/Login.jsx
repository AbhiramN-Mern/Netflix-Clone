import React, { useState } from 'react'
import "./Login.css"
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { signup, login } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function Login() {

  let [signState,setSignState]=useState("sign In")
  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  const user_auth=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      if(signState==="sign UP"){
        await signup(name,email,password)
      }else{
        await login(email,password)
      }
      navigate("/")
      setLoading(false)
     
    } catch (error) {
      console.error("Authentication error:", error)
      setLoading(false)
    }
  }

  return (
    loading? <div className='login-spinner'>
      <img src={netflix_spinner} alt="loading..." />
    </div> :
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h2>{signState}</h2>
        <form>
          {signState==="sign UP"?
          <input type="text" placeholder=' Name' required value={name} onChange={(e)=>setName(e.target.value)} />:""}
          <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" onClick={user_auth}>{signState}</button>
          <div className="form-help">
          <div className="remember">
            <input type="checkbox" />
            <label htmlFor="">Remember me</label>
          </div>
          <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="sign In"?<p>New to Netflix?  <span onClick={()=>setSignState("sign UP")}>Sign Up</span></p>:<p>Already have an account? <span onClick={()=>setSignState("sign In")}>Sign In</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
