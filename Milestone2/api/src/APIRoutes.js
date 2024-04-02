const router = require("express").Router();

const {assignments, classes, users} = require('./data');

const ClassDAO = require('./db/ClassDAO')
const AssignmentDAO = require('./db/AssignmentDAO');
const AssignmentTypeDAO = require('./db/AssignmentTypeDAO');
// will implement once token authentication is added
// const UserDAO = require('./db/UserDAO');

// router.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

//get all assignments
router.get('/assignments', (req,res) => {
    AssignmentDAO.getAssignments().then(assignments => {
        res.json(assignments);
    })
    .catch(err => {
        res.status(400).json({error: err});
    })
    
});
//get specific assignment
router.get('/assignments/:assignmentId', (req, res) =>{
    const assignmentId = req.params.assignmentId;
    AssignmentDAO.getAssignmentById(assignmentId).then(assignment => {
        if(assignment){
            res.json(assignment);
        } else {
            res.status(404).json({error:'Assignment not found'});
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
});


//get all classes
router.get('/classes', (req,res) => {
    ClassDAO.getClasses().then(classes => {
        res.json(classes);
    })
    .catch(err => {
        res.status(400).json({error: err});
      });
});

router.get('/classes/:classCode', (req, res) =>{
    const classCode = req.params.classCode;
    ClassDAO.getClassByCode(classCode).then(classData => {
        if(classData){
            res.json(classData);
        }
        else {
            res.status(404).json({error: 'Class not found'});
          }
    })
    .catch(err => {
        res.status(500).json({error: err});
      });
});

router.get('/classes/:classCode/assignment-types', (req, res) => {
        const classCode = req.params.classCodes;
        AssignmentTypeDAO.getAssignmentTypeByClass(classCode).then(types =>{
            res.json(types);
        })
        .catch(err => {
            res.status(400).json({error: err});
          });
})
router.get('/assignments/class/:classCode', (req,res) => {
    classCode = req.params.classCode;
    //TODO: make sure class exists before filtering once class data is created
    AssignmentDAO.getAssignmentByClass(classCode).then(assignments => {
        res.json(assignments);
    });
});

router.get('/assignment-types', (req,res) => {
    AssignmentTypeDAO.getAssignmentTypes().then(types => {
        res.json(types);
    })
    .catch(err => {
        res.status(400).json({error: err});
    })
})


router.get('/users', (req,res) => {
    res.json(Object.values(users));
});

router.get('/users/:userId', (req, res) =>{
    const user = users[req.params.userId];
    if(user){
        res.json(user);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

module.exports = router;
