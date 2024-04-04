const db = require('./DBConnection');
const User = require('./models/User');

function getUserByCredentials(username, password) {
  return db.query('SELECT * FROM user WHERE usr_username=?', [username]).then(({results}) => {
    const user = new User(results[0]);
    if (user) { // we found our user
      return user.validatePassword(password);
    }
    else { // if no user with provided username
      throw new Error("No such user");
    }
  });
}

function createUser(user) {
  return db.query('INSERT INTO user (`usr_first_name`, `usr_last_name`, `usr_username`, `usr_password`) VALUES (?, ?, ?, ?)',
    [user.first_name, user.last_name, user.username, user.password]).then(({results}) => {

    });
}


module.exports = {
  getUserByCredentials: getUserByCredentials,
};
