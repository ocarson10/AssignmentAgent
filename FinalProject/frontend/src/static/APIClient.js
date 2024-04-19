import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';
function checkResponse(res) {
  if(!res.ok) {
    throw new Error("There was an error in fetch");
  }
  return res;
}

function handleError(error) {
    throw error;
  }
  
  const getCurrentUser = () => {
    return HTTPClient.get(`${API_BASE}/users/current`);
  };
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

  const deleteAssignmentById = (id) => {
    return HTTPClient.delete('${API_BASE}/assignments/${id}/delete');
  }

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
  const getAssignmentTypeByClass = (classId) => {
    return fetch(API_BASE + `/classes/${classId}/assignment-types`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(types => {
        return types;
      })
      .catch(handleError);
  };

  const getAssignmentTypes = () => {
    return fetch(API_BASE + '/assignment-types')
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(types => {
        return types;
      })
      .catch(handleError);
  }
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

  const logIn = (username, password) => {
    const data = {
      username: username,
      password: password
    }
    return HTTPClient.post(`${API_BASE}/users/login`, data);
  };

  const logOut = () => {
    return HTTPClient.post(`${API_BASE}/users/logout`, {});
  };
  const createUser = (first_name, last_name, username, password) => {
    
    const data = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    }
    return HTTPClient.post(`${API_BASE}/users`, data);
  };
  const addAssignment = (classId, name, type, dueDate, grade, status, userId) => {
    const data = {
      classId: classId,
      name: name,
      type: type,
      dueDate: dueDate,
      grade: grade,
      status: status,
      userId: userId
    }
    return HTTPClient.post(`${API_BASE}/assignments`, data);
  };
  const addClass = (name, creditHours, userId) => {
    const data = {
      name: name,
      creditHours: creditHours,
      userId: userId
    }
    return HTTPClient.post(`${API_BASE}/classes`, data);
  };
  
  const addAssignmentType = (name, classId, percentage) => {
    const data = {
      name: name,
      classId: classId,
      percentage: percentage
    }
    return HTTPClient.post(`${API_BASE}/assignmentTypes`, data);
  };

  export default {
    getCurrentUser,
    getAssignments,
    getAssignmentById,
    getAssignmentsByClassCode,
    getClasses,
    getClassById,
    getAssignmentTypeByClass,
    getAssignmentTypes,
    getUsers,
    getUserById,
    logIn,
    logOut,
    createUser,
    addAssignment,
    addClass,
    addAssignmentType
  };
