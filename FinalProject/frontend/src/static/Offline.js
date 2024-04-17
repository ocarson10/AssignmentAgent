import React from 'react';
import "./css/Offline.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from "./images/assignment-agent-logo.png"
import OfflineImage from "./images/offline.png"


function Offline() {

    return (
        <div id="offline-page">
             {/* Navigation Bar start */}
             <Navbar expand="lg" className="bg-body-tertiary" >
                    <Container fluid>
                        <Navbar.Brand href="./"><img src={Image} alt="AssignmentAgent Logo"/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                       
                    </Container>
                </Navbar>
                {/* Navigation Bar end */}
         <div id="offline-elements">
         <img id="offline-icon" src={OfflineImage} alt="Internet Connection Icon"/>
         <h1 id="offline-header">You are currently offline.</h1>
          <p id="offline-p">The action you requested could not be preformed. Please check your internet connection, Thanks!</p>

        </div>
          

        
        </div>
      );
}
export default Offline;
