import React from "react";
import api from "./APIClient.js";
import "./css/ClassList.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

import AddClass from "./components/addClass.js";
import ClassForm from "./components/classForm.js";
import Image from "./images/assignment-agent-logo.png"
function ClassList() {
    const[allClasses, setAllClasses] = React.useState([]);
    const[classModal, setClassModal] = React.useState(false);
    const[allAssignmentTypes, setAllAssignmentTypes] = React.useState([]);
    const[checkedItem] = React.useState(null);
    const[user, setUser] = React.useState(null);

    React.useEffect(() => {
        api.getCurrentUser()
          .then(user => {
            setUser(user);
          })
          .catch(error => {
            if (error.status === 401) {
              window.location = './';
            } else {
              console.log(`${error.status}`, error);
            }
          });
      }, []);

    const handlePopupClass = (event) => {
        setClassModal(true);
    }

    React.useEffect(() => {
        if (user) {
            const fetchClasses = async () => {
                let classes = await api.getClasses();
                classes = classes.filter(singleClass => singleClass.userId === user.id);
                setAllClasses(classes);
            };
            fetchClasses();
        }
    }, [user]);

    React.useEffect(() => {
        const fetchAssignmentTypes = async () => {
            const types = await api.getAssignmentTypes();
            setAllAssignmentTypes(types);
        };
        fetchAssignmentTypes();
    }, []);

    if (!user) {
        return null;
    } else {
    return (
        <div id="classlist-page">
            {/* Navigation Bar from Olivia's Tracker Page */}

            {/* Navigation Bar start */}
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container fluid>
                    <Navbar.Brand href="#home"><img src={Image} alt="AssignmentAgent Logo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Sign Out</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Navigation Bar end */}

            <div id="classlist-content">
                <h2>Class List</h2>
                <h4>Total Classes: {allClasses.length}</h4>
                <div id="classlist-btns">
                    <button value="View Calendar"><FontAwesomeIcon icon={faCalendar} /></button>
                    <a href="/tracker"><button id="Tracker" href="/tracker">Assignment Tracker</button></a>
                    {!checkedItem && (
                        <button onClick={handlePopupClass}>Add Class</button>
                    )}
                </div>

                <div id="card-container">
                    {/* Reference: https://react-bootstrap.netlify.app/docs/components/cards/ */}
                    {allClasses.map(singleClass =>(
                        <Card>
                            <Card.Header>{singleClass.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Credit Hours: {singleClass.creditHours}</Card.Title>
                                <Card.Text>
                                <ul>
                                    {allAssignmentTypes
                                        .filter((type) => type.className === singleClass.name)
                                        .map((filteredType, index) => (
                                            <li key={index}>
                                            {filteredType.name}: {filteredType.percentage}%
                                            </li>
                                    ))}
                                </ul>
                                </Card.Text>
                            </Card.Body>
                            {/* TODO: Create functionality for these buttons */}
                            <div id="card-btns">
                                <button value="Edit"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button value="Delete"><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        </Card>
                    ))}
                </div>

                <AddClass trigger={classModal} setTrigger={setClassModal}>
                    <ClassForm allClasses={allClasses} user={user}/>
                </AddClass>
            </div>    
        </div>
        
    );}
  }
  
  export default ClassList;
