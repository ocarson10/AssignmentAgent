const router = require("express").Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

const {TokenMiddleware, generateToken, removeToken} = require('./middleware/TokenMiddleware');

const ClassDAO = require('./db/ClassDAO')
const AssignmentDAO = require('./db/AssignmentDAO');
const AssignmentTypeDAO = require('./db/AssignmentTypeDAO');
const UserDAO = require('./db/UserDAO');

// router.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

//get all assignments
router.get('/assignments', TokenMiddleware, (req,res) => {
    AssignmentDAO.getAssignments().then(assignments => {
        res.json(assignments);
    })
    .catch(err => {
        res.status(400).json({error: err});
    })
    
});
//get specific assignment
router.get('/assignments/:assignmentId', TokenMiddleware,(req, res) =>{
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

//delete specific assignment
router.delete('/assignments/:assignmentId/delete', TokenMiddleware,(req, res) => {
    const assignmentId = req.params.assignmentId;
    AssignmentDAO.deleteAssignment(assignmentId).then(assignment => {
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
router.get('/classes', TokenMiddleware,(req,res) => {
    ClassDAO.getClasses().then(classes => {
        res.json(classes);
    })
    .catch(err => {
        res.status(400).json({error: err});
      });
});

router.get('/classes/:id', TokenMiddleware, (req, res) =>{
    const id = req.params.id;
    ClassDAO.getClassById(id).then(classData => {
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

router.get('/classes/:classId/assignment-types', TokenMiddleware, (req, res) => {
        const classId = req.params.classId;
        AssignmentTypeDAO.getAssignmentTypeByClass(classId).then(types =>{
            res.json(types);
        })
        .catch(err => {
            res.status(400).json({error: err});
          });
})
router.get('/assignments/class/:classCode', TokenMiddleware, (req,res) => {
    classCode = req.params.classCode;
    //TODO: make sure class exists before filtering once class data is created
    AssignmentDAO.getAssignmentByClass(classCode).then(assignments => {
        res.json(assignments);
    });
});

router.get('/assignment-types', TokenMiddleware, (req,res) => {
    AssignmentTypeDAO.getAssignmentTypes().then(types => {
        res.json(types);
    })
    .catch(err => {
        res.status(400).json({error: err});
    })
});

router.post('/users/login', (req,  res) => {
    if(req.body.username && req.body.password) {
      UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
        let result = {
          user: user
        }
  
        generateToken(req, res, user);
  
        res.json(result);
      }).catch(err => {
        res.status(400).json({error: err});
      });
    }
    else {
      res.status(401).json({error: 'Not authenticated'});
    }
});

router.post('/users/logout', (req,  res) => {
    removeToken(req, res);
  
    res.json({success: true});
});

router.get('/users/current', TokenMiddleware, (req,  res) => {
    console.log("CURRENT USER:",req.user);
    res.json(req.user);
});

router.get('/users', TokenMiddleware, (req,res) => {
    res.json(Object.values(users));
});

router.post('/users', (req, res) => {
    let user = req.body;
    UserDAO.createUser(user).then(newUser => {
        res.json(newUser);
    });
});

router.post('/assignments', (req, res) => {
    let assignment = req.body;
    AssignmentDAO.createAssignment(assignment).then(newAssignment => {
        res.json(newAssignment);
    });
});

router.post('/classes', (req, res) => {
    let clss = req.body;
    ClassDAO.createClass(clss).then(newClass => {
        res.json(newClass);
    });
});

router.get('/users/:userId', TokenMiddleware, (req, res) =>{
    const user = users[req.params.userId];
    if(user){
        res.json(user);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

router.post('/assignmentTypes', (req, res) => {
    let assignmentType = req.body;
    AssignmentTypeDAO.createAssignmentType(assignmentType).then(newAssignmentType => {
        res.json(newAssignmentType);
    })
})

module.exports = router;
