const db = require('./DBConnection');
const AssignmentType = require('./models/AssignmentType');
const Assignment = require('./models/AssignmentType');

function getAssignmentTypes() {
    return db.query('SELECT * FROM assignment_type').then(({results}) => {
        return results.map(type => new AssignmentType(type)); ;
    });
}

function getAssignmentTypeById(typeName, classId){
    return db.query('SELECT * FROM assignment WHERE type_name=? AND clss_id=?', [typeName, classId]).then(({results}) => {
        if(results[0])
          return new AssignmentType(results[0]);
      });
}
function getAssignmentTypeByClass(classCode){
    return db.query('SELECT * FROM assignment WHERE clss_id=?', [classId]).then(({results}) => {
        return results.map(type => new AssignmentType(type)); ;
      });
}
function createAssignmentType(type){
    return db.query('INSERT INTO assignment_type (`type_name`, `clss_id`, `percentage`) VALUES (?, ?, ?)', [type.name, type.classId, type.percentage]).then(({results}) => {
        return getAssignmentTypeById(results.insertId);
      });
}

module.exports = {
    getAssignmentTypes: getAssignmentTypes,
    getAssignmentTypeById: getAssignmentTypeById,
    getAssignmentTypeByClass: getAssignmentTypeByClass,
    createAssignmentType: createAssignmentType
};
