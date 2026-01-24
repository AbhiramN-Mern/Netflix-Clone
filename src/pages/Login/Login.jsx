import React, { useState } from 'react'
import "./Login.css"
import logo from '../../assets/logo.png'
function Login() {

  let [signState,setSignState]=useState("sign In")

  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h2>{signState}</h2>
        <form>
          {signState==="sign UP"?<input type="text" placeholder=' Name' required />:""}
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          <button type="submit">Sign Up</button>
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
