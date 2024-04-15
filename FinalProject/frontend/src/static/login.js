import React, { useState } from 'react'
import api from "./APIClient.js";
import { useNavigate } from 'react-router-dom'
import "./css/login.css";
import Image from "./images/assignment-agent-logo.png"
import SignUpPopup from './components/SignUpPopup.js';
import { Link } from 'react-router-dom';

// Used this tutorial for guidance: https://clerk.com/blog/building-a-react-login-page-template

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [buttonPopup, setButtonPopup] = React.useState(false);
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  // const[assignmentModal, setAssignmentModal] = React.useState(false);

  // const navigate = useNavigate()

  const onButtonClick = () => {
    api.logIn(username, password).then(userData => {
      document.location = "./tracker";
    }).catch((err) => {
      console.log("ERROR");
    });
  }

  const onSignUpClick = () => {
    setButtonPopup(true);
  }
  const onCreateClick = () => {
    api.createUser(newFirstName, newLastName,newUsername,newPassword).then(userData => {
      document.location = "./";
    }).catch((err) => {
      console.log("ERROR");
    });
  }
  return (
    <div className={'mainContainer'}>
        <img id="logo" src={Image} alt="AssignmentAgent Logo"/>
        <br />
        <div className={'loginBox'}>
            <div className={'loginHeader'}>
                <h2>LOGIN</h2>
            </div>
            <div className={'inputContainer'}>
                <label htmlFor="userField">Username</label>
                <input id="userField"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                className={'inputBox'}
                />
                {/* <label className="errorLabel">{usernameError}</label> */}
            </div>
            <br />
            <div className={'inputContainer'}>
                <label htmlFor="passField">Password</label>
                <input type="password" id="passField"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className={'inputBox'}
                />
                {/* <label className="errorLabel">{passwordError}</label> */}
            </div>
            <br />
            <div className={'inputContainer'}>
                <button id="login-btn" onClick={onButtonClick}>Login</button>
            </div>
            <div>
                <small>Need an account? <Link onClick={onSignUpClick}>SIGN UP</Link></small>
            </div>
        </div>

        <SignUpPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Sign Up</h3>
          <div className={'inputContainer'}>
              <label htmlFor="newFirstNameField">First Name</label>
                <input id="newFirstNameField"
                value={newFirstName}
                onChange={(ev) => setNewFirstName(ev.target.value)}
                className={'inputBox'}
              />
              {/* <label className="errorLabel">{passwordError}</label> */}
          </div>
          <div className={'inputContainer'}>
              <label htmlFor="newLastNameField">Last Name</label>
                <input id="newLastNameField"
                value={newLastName}
                onChange={(ev) => setNewLastName(ev.target.value)}
                className={'inputBox'}
              />
              {/* <label className="errorLabel">{passwordError}</label> */}
          </div>
          <div className={'inputContainer'}>
              <label htmlFor="newUserField">Username</label>
                <input id="newUserField"
                value={newUsername}
                onChange={(ev) => setNewUsername(ev.target.value)}
                className={'inputBox'}
              />
          </div>
          <div className={'inputContainer'}>
              <label htmlFor="newPassField">Password</label>
                <input type="password" id="newPassField" 
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
                className={'inputBox'}
              />
              {/* <label className="errorLabel">{passwordError}</label> */}
          </div>
          <div className={'inputContainer'}>
              <button id="submit-btn" onClick={onCreateClick}>Create Account</button>
          </div>
        </SignUpPopup>

    </div>
  )
}

export default Login
