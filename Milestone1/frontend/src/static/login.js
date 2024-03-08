import React, { useState } from 'react'
import api from "./APIClient.js";
import { useNavigate } from 'react-router-dom'
import "./css/login.css";
import Image from "./images/assignment-agent-logo.png"

// Used this tutorial for guidance: https://clerk.com/blog/building-a-react-login-page-template

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [allUsers, setAllUsers] = React.useState([]);

  const navigate = useNavigate()

  const onButtonClick = () => {
    allUsers.forEach((user) => {
      if ((user.username === username) && (user.password === password)) {
        navigate("/tracker");
      } else {
        console.log("ERROR");
      }
    });
  }

  React.useEffect(() => {
    const fetchUsers = async () => {
      const users = await api.getUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <div className={'mainContainer'}>
        <img id="logo" src={Image} alt="AssignmentAgent Logo"/>
        <br />
        <div className={'loginBox'}>
            <div className={'loginHeader'}>
                <h2>LOGIN</h2>
            </div>
            <div className={'inputContainer'}>
                <label for="userField">Username</label>
                <input id="userField"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                className={'inputBox'}
                />
                {/* <label className="errorLabel">{usernameError}</label> */}
            </div>
            <br />
            <div className={'inputContainer'}>
                <label for="passField">Password</label>
                <input id="passField"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className={'inputBox'}
                />
                {/* <label className="errorLabel">{passwordError}</label> */}
            </div>
            <br />
            <div className={'inputContainer'}>
                <button onClick={onButtonClick}>Login</button>
            </div>
            <div>
                <small>Need an account? <a>SIGN UP</a></small>
            </div>
        </div>
    </div>
  )
}

export default Login