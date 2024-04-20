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

function getAssignmentByClass(classId){
    return db.query('SELECT * FROM assignment WHERE clss_id=?', [classId]).then(({results}) => {
        if(results)
        return results.map(assignment => new Assignment(assignment)); ;
      });
}
function createAssignment(assignment){
    return db.query('INSERT INTO assignment (`clss_id`, `asm_name`, `asm_type`, `asm_due`, `asm_grade`, `asm_status`, `usr_id`)  VALUES (?, ?, ?, ?, ?, ?, ?)', [assignment.classId, assignment.name, assignment.type, assignment.dueDate, assignment.grade, assignment.status, assignment.userId]).then(({results}) => {
        return getAssignmentById(results.insertId);
      });
}
function deleteAssignment(assignmentId){
    return db.query('DELETE FROM assignment WHERE asm_id=?', [assignmentId]).then(({results}) => {
        if(results)
        return results;
    })
}

function updateAssignment(assignment){
    return db.query('UPDATE assignment SET clss_id=?, asm_name=?, asm_type=?, asm_due=?, asm_grade=?, asm_status=? WHERE asm_id=?', [assignment.classId, assignment.name, assignment.type, assignment.dueDate, assignment.grade, assignment.status, assignment.asmId]).then(({results}) => {
        return getAssignmentById(assignment.asmId);
      });
}

module.exports = {
    getAssignments: getAssignments,
    getAssignmentById: getAssignmentById,
    deleteAssignment: deleteAssignment,
    getAssignmentByClass: getAssignmentByClass,
    createAssignment: createAssignment,
    updateAssignment: updateAssignment
};
