const db = require('./DBConnection');
const Assignment = require('./models/Assignment');

function getAssignments() {
    return db.query('SELECT * FROM assignment').then(({results}) => {
        return results.map(assignment => new Assignment(assignment)); ;
    });
}

function getAssignmentById(assignmentId){
    return db.query('SELECT * FROM assignment WHERE asm_id=?', [assignmentId]).then(({results}) => {
        if(results[0])
          return new Assignment(results[0]);
      });
}

function getAssignmentByClass(classCode){
    return db.query('SELECT * FROM assignment WHERE class_name=?', [classCode]).then(({results}) => {
        if(results)
        return results.map(assignment => new Assignment(assignment)); ;
      });
}
function createAssignment(assignment){
    return db.query('INSERT INTO assignment (`asm_id`, `class_name`, `asm_name`, `asm_type`, `asm_due`, `asm_grade`, `asm_status`)  VALUES (?, ?, ?, ?, ?, ?, ?)', [assignment.id, assignment.classId, assignment.name, assignment.type, assignment.dueDate, assignment.grade, assignment.status]).then(({results}) => {
        return getAssignmentById(results.insertId);
      });
}

module.exports = {
    getAssignments: getAssignments,
    getAssignmentById: getAssignmentById,
    getAssignmentByClass: getAssignmentByClass,
    createAssignment: createAssignment
};
