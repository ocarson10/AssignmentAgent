import React from "react";

function ClassForm(props) {
    const[classCode, setClassCode] = React.useState('');
    const[assignmentType, setAssignmentType] = React.useState('');
    const[percentage, setPercentage] = React.useState('');

    const handleSubmit = (e) => {
        // should eventually post assignment to db
        window.location.reload();
    }
   
    return (

        <div className="assignmentForm">
             {!props.isEdit && (
                <h3>Add Class</h3>
            )}
            
            <form>
                <label>
                    Class Code
                    <input type="text" value={classCode} onChange={(e) => {
                        setClassCode(e.target.value);
                    }}/>
                </label>
                <br></br>
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
                </label>

                <br></br>
                <button className="form-button" id="addType">Add Type</button>
                <button className="form-button" id="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );

}
export default ClassForm;
