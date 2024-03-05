const router = require("express").Router();

const {assignments, classes} = require('./data');

// router.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

router.get('/assignments', (req,res) => {
    res.json(Object.values(assignments));
});
router.get('/assignments/:assignmentId', (req, res) =>{
    const assignment = assignments[req.params.assignmentId];
    if(assignment){
        res.json(assignment);
    } else {
        res.status(404).json({error: "Assignment not found"});

    }
});

router.get('/classes', (req,res) => {
    res.json(Object.values(classes));
});

router.get('/classes/:classCode', (req, res) =>{
    const singleClass = classes[req.params.classCode];
    if(singleClass){
        res.json(singleClass);
    } else {
        res.status(404).json({error: "Class not found"});

    }
});

router.get('/assignments/class/:classCode', (req,res) => {
    classCode = req.params.classCode;
    //TODO: make sure class exists before filtering once class data is created
    const results = Object.values(assignments).filter(assignment => assignment.classCode.includes(classCode));
    res.json(results);
})
module.exports = router;
