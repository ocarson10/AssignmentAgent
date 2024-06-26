
const API_BASE = '/api';
function checkResponse(res) {
  if(!res.ok) {
    throw new Error("There was an error in fetch");
  }
  return res;
}

function handleError(error) {
    console.log("ERROR", error);
    throw error;
  }

  const getAssignments = () => {
    return fetch(API_BASE + '/assignments')
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(assignments => {
        return assignments;
      })
      .catch(handleError);
  };
  
  const getAssignmentById = (id) => {
    return fetch(API_BASE + `/assignments/${id}`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(assignment => {
        return assignment;
      })
      .catch(handleError);
  };
  
  const getAssignmentsByClassCode = (classCode) => {
    if(classCode === "all"){
      return getAssignments();
    }
    return fetch(API_BASE + `/assignments/class/${classCode}`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .catch(handleError);
  
  };
  const getClasses = () => {
    return fetch(API_BASE + '/classes')
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(classes => {
        return classes;
      })
      .catch(handleError);
  };
  
  const getClassById = (id) => {
    return fetch(API_BASE + `/classes/${id}`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(singleClass => {
        return singleClass;
      })
      .catch(handleError);
  };

  const getUsers = () => {
    return fetch(API_BASE + '/users')
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(users => {
        return users;
      })
      .catch(handleError);
  };
  
  const getUserById = (id) => {
    return fetch(API_BASE + `/users/${id}`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(user => {
        return user;
      })
      .catch(handleError);
  };
  module.exports = {
    getAssignments,
    getAssignmentById,
    getAssignmentsByClassCode,
    getClasses,
    getClassById,
    getUsers,
    getUserById
  };
