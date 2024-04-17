import React from "react";
import api from "../APIClient.js";

// When I get Back: Move this over to tracker.js to prevent fetch errors
function AssignmentForm(props) {
    const[selected, setSelected] = React.useState(0);
    const[name, setName] = React.useState('');
    const[type, setType] = React.useState('');
    const[date, setDate] = React.useState('');
    const[grade, setGrade] = React.useState('');
    const[status, setStatus] = React.useState('');
    const[allAssignmentTypes, setAllAssignmentTypes] = React.useState([]);
    const[filteredAssignments, setFilteredAssignments] = React.useState([]);


    React.useEffect(() => {
        const fetchAssignmentTypes = async () => {
            try{
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
        fetchAssignmentTypes();
    }, []);

   

    const handleSelectChange = (event) => {
        setSelected(event.target.value);
        const filteredAssignments = allAssignmentTypes.filter( type => type.classId == event.target.value);
        setFilteredAssignments(filteredAssignments);
    };
    const handleSubmit = (e) => {
        console.log("Selected", selected);
        console.log("Name", name);
        console.log("Type", type);
        console.log("Grade", grade);
        console.log("data", date);
        console.log("status", status);
        console.log("userid",props.user.id);
        // should eventually post assignment to db
        api.addAssignment(selected, name, type, date, grade, status, props.user.id).then(userData => {
            document.location = "./";
            console.log("PASS");
        }).catch((err) => {
            console.log("ERROR addAssignment", err);

            if(err.message === 'Offline' || err.status === 503) {
                document.location = "./offline";
              } else {
                console.log(err);
              }
        })
    }
   
    return (

        <div className="assignmentForm">
            {props.isEdit && (
                <h3>Edit Assignment</h3>
                // TODO: For edit Set field variables to assignment being edited so form is populated upon load 
            )}
             {!props.isEdit && (
                <h3>Add Assignment</h3>
            )}
            
            <form>
                <label>
                    Class Code 
                    <select name="classes" id="classes" value={selected} onChange={handleSelectChange}>
                      <option value="All Classes">All Classes</option>
                        {props.allClasses.map(singleClass => (
                            <option key={singleClass.id} value={singleClass.id}>{singleClass.name}</option>
                        ))}
                </select>
                </label>
                <label>
                    Name 
                    <input type="text" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </label>
                <br />
                <label>
                    Type 
                    <select name="type" id="type" value={type} onChange={(e) => {
                        setType(e.target.value);
                    }}>
                        <option value="Select Type">Select a Type</option> 
                        {filteredAssignments.map((type, index) => (
                        <option key={index} value={type.name}>{type.name}</option>
                        ))}
                                          
                    </select>
                </label>
                <label>
                    Due Date 
                    <input type="datetime-local" value={date} onChange={(e) => {
                        setDate(e.target.value);
                    }}/>
                </label>
                <br />
                <label>
                    Grade 
                    <input type="text" value={grade} onChange={(e) => {
                        setGrade(e.target.value);
                    }}/>
                </label>
                <label>
                    Status 
                    <select name="status" id="status" value={status} onChange={(e) => {
                        setStatus(e.target.value);
                    }}>
                         <option value="Select Status">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>                       
                       
                    </select>
                </label>
                <br />
               
                <button className="form-button" id="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );

}
export default AssignmentForm;
