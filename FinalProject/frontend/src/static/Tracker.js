import React from "react";
import api from "./APIClient.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import GPAPopup from "./components/GPAPopup.js";
import "./css/Tracker.css";
import AddAssignment from "./components/addAssignment.js";
import AssignmentForm from "./components/assignmentForm.js";
import Image from "./images/assignment-agent-logo.png"
function Tracker() {
    const [allAssignments, setAllAssignments] = React.useState([]);
    const[allClasses, setAllClasses] = React.useState([]);
    const[allAssignmentTypes, setAllAssignmentTypes] = React.useState([]);
    const[selected, setSelected] = React.useState('');
    const[buttonPopup, setButtonPopup] = React.useState(false);
    const[assignmentModal, setAssignmentModal] = React.useState(false);
    const[checkedItem, setCheckedItem] = React.useState(null);
    const[isEdit, setIsEdit]= React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await api.getCurrentUser();
                setUser(user);
            } catch(error) {
                if (error.status === 401) {
                window.location = './';
            } else {
                console.log(`${error.status}`, error);
            }
          };
        };

        fetchCurrentUser();
      }, []);


      React.useEffect(() => {
        if (user) {
        const fetchUserData = async () => {
          
            try{

                let assignments = await api.getAssignments();
                assignments = assignments.filter(assignment => assignment.userId === user.id);
                setAllAssignments(assignments);
                    
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
        fetchUserData();
    }
    }, [user]);

    const handleCheckboxChange = (id) => {
        
        if(id === checkedItem){
            setCheckedItem(null);
            setIsEdit(false);
        } else {
            setCheckedItem(id);
            setIsEdit(true);
        }
    }

    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };
    const handlePopupGPA = (event) => {
        setButtonPopup(true);
        setAssignmentModal(false);
    }
    const handlePopupAssignment = (event) => {
        setButtonPopup(false);
        setAssignmentModal(true);
    }
    const handleDeleteAssignment = (event) => {
        console.log(checkedItem);
        api.deleteAssignmentById(checkedItem);
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


    


    const getClassByCode = (id) => {
        const classFound = allClasses.find(singleClass => singleClass.id === id);
        return classFound ? classFound.name : ''; 
    }

    const calculateGrade = (classId) => {
        const assignmentsFound = allAssignments.filter(assignment => assignment.classId === classId);
        const typesFound = allAssignmentTypes.filter(type => type.classId === classId);
        let total = 0;
        if(typesFound.length === 0){
            return "--";
        }
        let percentTotal = 0;
        typesFound.forEach(type => {
            percentTotal += type.percentage;
        })
        if(percentTotal !== 100){
            return "--";
        }
        typesFound.forEach(type => {
            let sectionTotal = 0;
            assignmentsFound.forEach(assignment => {
                if(assignment.type === type.name){
                    if(assignment.grade !== null){
                        const [numerator, denominator] = assignment.grade.split('/');
                        // Convert strings to numbers
                        const num = parseFloat(numerator);
                        const denom = parseFloat(denominator);
                        // Calculate the decimal value
                        const decimalGrade = num / denom;
                        const percentage = type.percentage / 100;
                        const sectionGrade = decimalGrade * percentage;
                        sectionTotal += sectionGrade;
                    }
                }
            })
            total += sectionTotal * 100;
        });
        return total.toString();
    
    }

    const classFilter = () => {
       
        if(selected === "All Classes" || selected === ''){
            return allAssignments;
        }
        const classesFilered = allAssignments.filter(assignment => getClassByCode(assignment.classId) === selected);
        return classesFilered;
    }
    const deleteAssignment = (event) => {
        api.deleteAssignmentById(checkedItem).then(assignment => {
            document.location = "./tracker";
        }). catch((err) => {
            console.log("ERROR");

          if(err.message === 'Offline' || err.status === 503) {
            document.location = "./offline";
          } else {
            console.log(err);
          }
        });
    }

    if (!user) {
        return null;
    } else {
        return (
            <div id="tracker-page">
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
                <div id="tracker-elements">

            
                    <h2>Assignment Tracker</h2>
                    <div id="table-btns">
                        <div class="dropdown">
                            <label>Filter By:</label>
                            <select name="classes" id="classes" value={selected} onChange={handleSelectChange}>
                                <option value="All Classes">All Classes</option>
                                {allClasses.map(singleClass => (
                                    <option key={singleClass.id} value={singleClass.name}>{singleClass.name}</option>
                                ))}
                            </select>
                        </div>
                        <div id="top-btns">
                        <a href="/classlist"><button id="Classlist" href="/classlist">Class List</button></a>
                        <a href="/calendar">   <button value="View Calendar"><FontAwesomeIcon icon={faCalendar} /></button></a>
                            <button id="GPA" onClick={handlePopupGPA}>GPA</button>
                        </div>
                    </div>
                
                
                    <GPAPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <h3>GPA</h3>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Class Code</th>
                                    <th>Grade</th>
                                    <th>Credit Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allClasses.map(singleClass =>(
                                    <tr key={singleClass.id}>
                                        <td>{singleClass.name}</td>
                                        <td>{calculateGrade(singleClass.id)}</td>
                                        <td>{singleClass.creditHours.toString()}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {/* TODO: Make function that calculates gpa based on grade and credit hours */}
                        <p>Final GPA: --</p>
                    </GPAPopup>
                    
                    
                            <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th>Select</th>
                                    <th>Class Code</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Due Date</th>
                                    <th>Grade</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classFilter().map(assignment =>(
                                    <tr key={assignment.id}>
                                        {/* TODO: Make function that makes "Edit Assignment" and "Delete Assignment buttons appear when assignment is selected" */}
                                        <td><input type="checkbox" name="selectedAssignment" value={assignment.id} checked={assignment.id === checkedItem} onChange={() => handleCheckboxChange(assignment.id)}/></td>
                                        <td>{getClassByCode(assignment.classId)}</td>
                                        <td>{assignment.name}</td>
                                        <td>{assignment.type}</td>
                                        <td>{assignment.dueDate}</td>
                                        <td>{assignment.grade}</td>
                                        <td>{assignment.status}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {!checkedItem && (
                    
                            <button onClick={handlePopupAssignment}>Add Assignment</button>
                        
                        )}
                    
                        {checkedItem && (
                            <>
                                <button onClick={handlePopupAssignment}>Edit Assignment</button>
                                {/* Add functionality to delete assignment from db */}
                                <button onClick={deleteAssignment}>Delete Assignment</button>
                            </>
                        
                            
                        )}
                        <AddAssignment trigger={assignmentModal} setTrigger={setAssignmentModal}>
                            <AssignmentForm allClasses={allClasses} isEdit={isEdit} checkedItem={checkedItem} user={user}  />
                        </AddAssignment>

                </div>    
            </div>
            

        );}
  }
  
  export default Tracker;
