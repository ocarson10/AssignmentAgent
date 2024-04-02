module.exports = class Class {
    name = null;
    creditHours= null;
    
    constructor(data) {
        this.name = data.clss_name;
        this.creditHours = data.credit_hours;
    }
};
