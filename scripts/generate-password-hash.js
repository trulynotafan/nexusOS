const bcrypt = require('bcryptjs');

const password = 'wholoveme414lolff';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Password Hash:', hash); 