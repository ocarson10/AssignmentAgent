const db = require('./DBConnection');
const User = require('./models/User');
const crypto = require('crypto');

function generateSalt(){
    return crypto.randomBytes(24).toString('hex');

  }
  function hashPassword(password, salt){
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString('hex'));
        }
      });
    });
  }

  function getUserById(userId) {
    return db.query('SELECT * FROM user WHERE usr_id=?', [userId]).then(({results}) => {
      if(results[0])
        return new User(results[0]);
    });
  }
  

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
  const salt = generateSalt();
  return hashPassword(user.password, salt)
    .then(hashedpassword => {
      return db.query('INSERT INTO user (`usr_first_name`, `usr_last_name`, `usr_username`, `usr_password`, `usr_salt`) VALUES (?, ?, ?, ?, ?)',
        [user.first_name, user.last_name, user.username, hashedpassword, salt]);
    })
    .then(({results}) => {
      return getUserById(results.insertId);
    });
}
 

module.exports = {
  getUserById: getUserById,
  getUserByCredentials: getUserByCredentials,
  createUser: createUser
};
