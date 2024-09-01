import React from 'react'
import '../styles/LoginRegisterStyles.css'
import {useState} from 'react'
import username_icon from '../images/user.png'
import password_icon from '../images/password.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginRegister=()=>{
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/v1";

  const handleUsername = (event) => {
    const {value} = event.target;
    setUsername(value);
  }
  const handlePassword = (event) => {
    const {value} = event.target;
    setPassword(value);
  }
  const handleConfirmPassword = (event) => {
    const {value} = event.target;
    setConfirmPassword(value);
  }
  const submitLogin = async () => {

    try{
      const response = await axios.post(url+"/login",{
        username,
        password
      });
      
      if(response.data.token){
        localStorage.setItem('jwt',response.data.token);
      } else {
        navigate("/");
      }
      if(response.status===200){
        navigate("/dashboard");
      } else {
        alert("Invalid Login");
      }
    } catch(error) {
      console.error('Error during login:', error);
      alert('Invalid Login. Please try again.');
    }
  }
  const submitRegister = async () => {

    if(password!==confirmPassword){
      alert('Confirm password should match Password');
    }
    else{
      try{
        const response = await axios.post(url+"/register",{
          username,
          password,
        });
        if(response.status===201){
          alert("Registered successfully");
        } else {
          alert("Invalid Details");
        }
      } catch(error) {
        console.error('Error during register:', error);
        alert('Invalid Details. Please try again.');
      }
    }
  }

    return (
      <><div className="newcontainer">Check your <br /> Expenses now!</div>
        <div className="container">
          <div className="header">
            <div className="text" style={{color:'black'}}>{action}</div>
           
          </div>
          <div className="inputs">
            {<div className="input">
                <img src={username_icon} alt="" />
                <input type="text" placeholder="username" onChange={handleUsername} value={username}/>
            </div>}
          
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='password' onChange={handlePassword} value={password}/>
            </div>
            {action==="Sign Up"? <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='confirm password' onChange={handleConfirmPassword} value={confirmPassword}/>
            </div>:<div></div>}
          </div>
          {action==="Sign Up"? <button onClick={submitRegister} className='registerbutton'>Register</button>:<button onClick={submitLogin} className='signinbutton'>Sign in</button>}
          <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
          </div>
        </div>
      </>
        
    )   
}

export default LoginRegister
