import React from "react";
import api from "../APIClient.js";

function AssignmentTypeForm(props) {
    const[typeName, setTypeName] = React.useState('');
    const[typeClass, setTypeClass] = React.useState(0);
    const[typePercentage, setTypePercentage] = React.useState(0);
    // const[assignmentType, setAssignmentType] = React.useState('');
    // const[percentage, setPercentage] = React.useState('');
    const[selected, setSelected] = React.useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // should eventually post assignment to db
        console.log("name", typeName);
        console.log("class", typeClass);
        console.log("percentage", typePercentage);
        api.addAssignmentType(typeName, typeClass, typePercentage).then(userData => {
            document.location = "./classlist";
            console.log("PASS");
        }).catch((err) => {
            console.log("ERROR addAssignmentType", err);
            if(err.message === 'Offline' || err.status === 503) {
                document.location = "./offline";
              } else {
                console.log(err);
              }
        })
    }
   
    return (

        <div className="assignmentTypeForm">
             {!props.isEdit && (
                <h3>Add Assignment Type</h3>
            )}
            
            <form>
                <label>
                    Class Code 
                    <select name="classes" id="classes" value={typeClass} onChange={(e) => {
                        setTypeClass(e.target.value);
                    }}>
                        <option value="Select a Class">Select a Class</option>
                        {props.allClasses.map(singleClass => (
                            <option key={singleClass.id} value={singleClass.id}>{singleClass.name}</option>
                        ))}
                    </select>
                </label>
                <br></br>
                <label>
                    Assignment Type Name
                    <input type="text" value={typeName} onChange={(e) => {
                        setTypeName(e.target.value);
                    }}/>
                </label>
                <br></br>
                <label>
                    Percentage of Grade
                    <input type="number" value={typePercentage} onChange={(e) => {
                        setTypePercentage(e.target.value);
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