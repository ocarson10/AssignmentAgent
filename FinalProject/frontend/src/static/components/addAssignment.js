import React from "react";
import "../css/GPA.css"

function AddAssignment(props) {
    return(props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <button className="exit-btn" onClick={() => props.setTrigger(false)}>Exit</button>
                {props.children}
            </div>
        </div>
    ): "";

}
export default AddAssignment;
