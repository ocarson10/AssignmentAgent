const db = require('./DBConnection');
const AssignmentType = require('./models/AssignmentType');
const Assignment = require('./models/AssignmentType');

function getAssignmentTypes() {
    return db.query('SELECT * FROM assignment_type').then(({results}) => {
        return results.map(type => new AssignmentType(type)); ;
    });
}
function getAssignmentTypeByValues(typeName, classId) {
    return db.query('SELECT * FROM assignment_type WHERE type_name = ? AND clss_id = ?', [typeName, classId])
        .then(({ results }) => {
            return results[0];
        })
        .catch(err => {
            console.error("Error fetching assignment type:", err);
            throw err;
        });
}

function getAssignmentTypeByClass(classCode){
    return db.query('SELECT * FROM assignment_type WHERE clss_id=?', [classId]).then(({results}) => {
        return results.map(type => new AssignmentType(type)); ;
      });
}
function createAssignmentType(type){
    return db.query('INSERT INTO assignment_type (`type_name`, `clss_id`, `percentage`) VALUES (?, ?, ?)', [type.name, type.classId, type.percentage]).then(({results}) => {
        return getAssignmentTypeByValues(type.name, type.classId);
      });
}

function deleteAssignmentType(typeName, classId) {
    return db.query('DELETE FROM assignment_type WHERE type_name=? AND clss_id=?', [typeName, classId])
        .then(({results}) => {
            return results;
        })
        .catch(err => {
            console.error("Error deleting assignment type:", err);
            throw err;
        });
}

module.exports = {
    getAssignmentTypes: getAssignmentTypes,
    getAssignmentTypeByValues: getAssignmentTypeByValues,
    getAssignmentTypeByClass: getAssignmentTypeByClass,
    createAssignmentType: createAssignmentType,
    deleteAssignmentType: deleteAssignmentType
};
