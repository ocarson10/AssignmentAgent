module.exports = class AssignmentType {
    name = null;
    className = null;
    percentage = null;
 
    
    constructor(data) {
        this.name = data.type_name;
        this.className = data.class_name;
        this.percentage = data.percentage;
       
    }
};
