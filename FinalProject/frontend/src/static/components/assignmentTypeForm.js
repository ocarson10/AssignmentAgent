import React from "react";
import api from "../APIClient.js";

function AssignmentTypeForm(props) {
    const[className, setClassName] = React.useState(0);
    const[creditHours, setCreditHours] = React.useState(0);
    const[assignmentType, setAssignmentType] = React.useState('');
    const[percentage, setPercentage] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // should eventually post assignment to db
        console.log("name", className);
        console.log("hours", creditHours);
        console.log("userid", props.user.id);
        api.addClass(className, creditHours, props.user.id).then(userData => {
            document.location = "./classlist";
            console.log("PASS");
        }).catch((err) => {
            console.log("ERROR addClass", err);
            if(err.message === 'Offline' || err.status === 503) {
                document.location = "./offline";
              } else {
                console.log(err);
              }
        })
    }
   
    return (

        <div className="assignmentForm">
             {!props.isEdit && (
                <h3>Add Class</h3>
            )}
            
            <form>
                <label>
                    Class Name
                    <input type="text" value={className} onChange={(e) => {
                        setClassName(e.target.value);
                    }}/>
                </label>
                <br></br>
                <label>
                    Credit Hours
                    <input type="number" value={creditHours} onChange={(e) => {
                        setCreditHours(e.target.value);
                    }}/>
                </label>
                {/*
                <label>
                    Assignment Type
                    <input type="text" placeholder="Ex: Homework" value={assignmentType} onChange={(e) => {
                        setAssignmentType(e.target.value);
                    }}/>
                </label>
                    
                <label>
                    Percentage
                    <input type="number" value={percentage} min="1" max="100" onChange={(e) => {
                        setPercentage(e.target.value);
                    }}/> %
                </label> */}

                <br></br>
                {/*<button className="form-button" id="addType">Add Type</button>*/}
                <button className="form-button" id="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );

}
export default AssignmentTypeForm;