import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import api from "./APIClient.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from "./images/assignment-agent-logo.png"
import "./css/Calendar.css";

function Calendar() {
    const [allAssignments, setAllAssignments] = React.useState([]);
    const[allClasses, setAllClasses] = React.useState([]);
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

                let classes = await api.getClasses();
                classes = classes.filter(singleClass => singleClass.userId === user.id);
                setAllClasses(classes);
                    console.log("CLASSES", classes);
                    let assignments = await api.getAssignments();
                    assignments = assignments.filter(assignment => assignment.userId === user.id);
                    let assignmentsToEvents = assignments.map( event => ({
                        id: event.id,
                        title: `${getClassName(event.classId, classes)} : ${event.name}`,
                        start: event.dueDate,
                        description: `Assignment Name: ${event.name} \nClass: ${getClassName(event.classId, classes)}`,
                        color: getStatusColor(event.status),
                        textColor: 'black'
                    }));
                    setAllAssignments(assignmentsToEvents);
                
               
                    
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

    const getClassName = (id, classes) => {
        console.log("Event ID: ", id);
        console.log("Function Classes: ",allClasses );
        const classFound = classes.find(singleClass => singleClass.id == id);
        return classFound ? classFound.name : ''; 
    }

    const getStatusColor = (status) => {
        if (status === 'Completed') {
          return 'yellow'; 
        } else if (status === 'In Progress') {
          return 'green'; 
        } else {
          return 'red'; 
        }
      };


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

    const handleEventClick = (clickInfo) => {
        alert(`${clickInfo.event.extendedProps.description}`);
        
    
    };

    if (!user) {
        return null;
    } else {
        return (
            <div>
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
                <h2 id="title-cal">Calendar View</h2>
                <div id="nav-btns">
                    <a href="/classlist"><button id="Classlist" href="/classlist">Class List</button></a>
                    <a href="/tracker"><button id="Classlist" href="/tracker">Assignment Tracker</button></a>
                </div>
                <FullCalendar id="calendar" plugins={[dayGridPlugin]} initialView="dayGridMonth" events={allAssignments} eventClick={handleEventClick}/>
               
            </div>
        )
    }
}





export default Calendar;
