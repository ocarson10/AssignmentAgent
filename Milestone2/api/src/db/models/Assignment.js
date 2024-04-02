module.exports = class Assignment {
    id = null;
    classCode = null;
    name = null;
    type = null;
    dueDate = null;
    grade = null;
    status = null;

    
    constructor(data) {
        this.id = data.asm_id;
        this.classCode = data.class_name;
        this.name = data.asm_name;
        this.type = data.asm_type;
        this.dueDate = data.asm_due;
        this.grade = data.asm_grade;
        this.status = data.asm_status;
    }
};
