module.exports = class Class {
    name = null;
    creditHours= null;
    userId = null;
    id = null;
    
    constructor(data) {
        this.name = data.clss_name;
        this.creditHours = data.credit_hours;
        this.userId = data.usr_id;
        this.id = data.clss_id;
    }
};
