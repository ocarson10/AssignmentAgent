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
import AssignmentTypeForm from "./components/assignmentTypeForm.js";
import AddAssignmentType from "./components/addAssignmentType.js";
function ClassList() {
    const[allClasses, setAllClasses] = React.useState([]);
    const[classModal, setClassModal] = React.useState(false);
    const[allAssignmentTypes, setAllAssignmentTypes] = React.useState([]);
    const[assignmentTypeModal, setAssignmentTypeModal] = React.useState(false);
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

    const handlePopupAssignmentType = (event) => {
        setAssignmentTypeModal(true);
    }

    const onSignOutClick = () => {
        api.logOut().then(() => {
          document.location = "./";
        }).catch((err) => {
          console.log("ERROR");

          if(err.message === 'Offline' || err.status === 503) {
            document.location = "./offline";
          } else {
            console.log(err);
          }
        });
    }

    function deleteAssignmentType(typeName, classId) {
        api.deleteAssignmentType(typeName, classId).then(assignmentType =>{
            console.log("delete");
            document.location = "./classlist"
        }).catch((err) => {
            console.log("ERROR");

            if(err.message === 'Offline' || err.status === 503) {
                document.location = "./offline";
            } else {
                console.log(err);
            }
        })
    }

    React.useEffect(() => {
        if (user) {
            const fetchClasses = async () => {
              
                try{
                    let classes = await api.getClasses();
                    classes = classes.filter(singleClass => singleClass.userId === user.id);
                    setAllClasses(classes);

                    const types = await api.getAssignmentTypes();
                    setAllAssignmentTypes(types);
                } catch(err){
                    if(err.message === 'Offline' || err.status === 503) {
                        document.location = "./offline";
                      } else {
                        console.log(err);
                      }
                }
            };
            fetchClasses();
        }
    }, [user]);


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
                        <Nav.Link> Welcome, {user.first_name} {user.last_name}</Nav.Link>
                        <Nav.Link onClick={onSignOutClick}>Sign Out</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Navigation Bar end */}

            <div id="classlist-content">
                <h2>Class List</h2>
                <h4>Total Classes: {allClasses.length}</h4>
                <div id="classlist-btns">
                <a href="/calendar"><button value="View Calendar"><FontAwesomeIcon icon={faCalendar} /></button></a>
                    <a href="/tracker"><button id="Tracker" href="/tracker">Assignment Tracker</button></a>
                    {!checkedItem && (
                        <button onClick={handlePopupClass}>Add Class</button>
                    )}

                    {!checkedItem && (
                        <button onClick={handlePopupAssignmentType}>Add Assignment Type</button>
                    )}
                </div>

                <div id="card-container">
                    {/* Reference: https://react-bootstrap.netlify.app/docs/components/cards/ */}
                    {allClasses.map(singleClass =>(
                        <Card key={singleClass.id}>
                            <Card.Header>{singleClass.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Credit Hours: {singleClass.creditHours}</Card.Title>
                                <ul>
                                    {allAssignmentTypes
                                        .filter((type) => type.classId === singleClass.id)
                                        .map((filteredType, index) => (
                                            <li key={index}>
                                            {filteredType.name}: {filteredType.percentage}%
                                            <button onClick={() => deleteAssignmentType(filteredType.name, filteredType.classId)} id="delete-type">X</button>
                                            </li>
                                    ))}
                                </ul>
                               
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

                <AddAssignmentType trigger={assignmentTypeModal} setTrigger={setAssignmentTypeModal}>
                    <AssignmentTypeForm allAssignmentTypes={allAssignmentTypes} allClasses={allClasses} user={user}/>
                </AddAssignmentType>
            </div>    
        </div>
        
    );}
  }
  
  export default ClassList;
