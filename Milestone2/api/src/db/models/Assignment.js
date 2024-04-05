module.exports = class Assignment {
    id = null;
    classId = null;
    name = null;
    type = null;
    dueDate = null;
    grade = null;
    status = null;
    userId = null;

    
    constructor(data) {
        this.id = data.asm_id;
        this.classId = data.clss_id;
        this.name = data.asm_name;
        this.type = data.asm_type;
        this.dueDate = data.asm_due;
        this.grade = data.asm_grade;
        this.status = data.asm_status;
        this.userId = data.usr_id;
    }
};
