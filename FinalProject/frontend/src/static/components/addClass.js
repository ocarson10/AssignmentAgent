import React from "react";
import "../css/GPA.css"

function AddClass(props) {
    // Inspired by video tutorial: https://www.youtube.com/watch?v=i8fAO_zyFAM
    return(props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <button className="exit-btn" onClick={() => props.setTrigger(false)}>Exit</button>
                {props.children}
            </div>
        </div>
    ): "";
        
  
}
export default AddClass;
