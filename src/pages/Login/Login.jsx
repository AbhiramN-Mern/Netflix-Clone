import React, { useState } from 'react'
import "./Login.css"
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { signup, login } from '../../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {

  let [signState,setSignState]=useState("sign In")
  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [loading,setLoading]=useState(false)
  const navigate = useNavigate()
  const [error,setError]=useState("")

  const user_auth=async(e)=>{
    if (e && e.preventDefault) e.preventDefault()
    setError("")
    setLoading(true)

    // basic client-side validation
    if(signState==="sign UP"){
      if(!name.trim() || !email.trim() || !password){
        const msg = "Please fill all fields";
        setError(msg); toast.error(msg); setLoading(false); return
      }
      if(password.length < 6){
        const msg = "Password should be at least 6 characters";
        setError(msg); toast.error(msg); setLoading(false); return
      }
    } else {
      if(!email.trim() || !password){
        const msg = "Please enter email and password";
        setError(msg); toast.error(msg); setLoading(false); return
      }
    }

    try {
      if(signState==="sign UP"){
        await signup(name,email,password)
      }else{
        await login(email,password)
      }
      navigate("/")
    } catch (err) {
      console.error("Authentication error:", err)
      // show a readable message
      const msg = err?.code ? err.code.split("/")[1].replace(/-/g, " ") : (err?.message || 'Authentication failed')
      toast.error(msg)
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      user_auth()
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
        <form onSubmit={(e)=>{e.preventDefault()}} noValidate>
          {signState==="sign UP"?
          <input type="text" placeholder=' Name' value={name} onChange={(e)=>setName(e.target.value)} onKeyDown={handleKeyDown} />:""}
          <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} onKeyDown={handleKeyDown} />
          <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={handleKeyDown} />
          {error && <div className='form-error'>{error}</div>}
          <button type="button" onClick={user_auth}>{signState}</button>
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
