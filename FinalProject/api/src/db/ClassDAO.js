const db = require('./DBConnection');
const Class = require('./models/Class');

function getClasses() {
    return db.query('SELECT * FROM class').then(({results}) => {
        return results.map(classData => new Class(classData)); ;
    });
}

function getClassByCode(classCode){
    return db.query('SELECT * FROM class WHERE clss_name=?', [classCode]).then(({results}) => {
        if(results[0])
          return new Class(results[0]);
      });
}
function getClassById(id){
    return db.query('SELECT * FROM class WHERE clss_id=?', [id]).then(({results}) => {
        if(results[0])
          return new Class(results[0]);
      });
}
function createClass(classData){
    return db.query('INSERT INTO class (`clss_name`, `credit_hours`, `usr_id`) VALUES (?, ?, ?)', [classData.name, classData.creditHours, classData.userId]).then(({results}) => {
        return getClassById(results.insertId);
      });
}

module.exports = {
    getClasses: getClasses,
    getClassByCode: getClassByCode,
    createClass: createClass,
    getClassById: getClassById
};
