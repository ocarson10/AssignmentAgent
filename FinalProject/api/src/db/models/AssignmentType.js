module.exports = class AssignmentType {
    name = null;
    classId = null;
    percentage = null;
 
    
    constructor(data) {
        this.name = data.type_name;
        this.classId = data.clss_id;
        this.percentage = data.percentage;
       
    }
};
