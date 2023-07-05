const sqlite3 = require('sqlite3');

sqlite3.verbose();

const path = __dirname + '/../../DBlog';
const db = new sqlite3.Database(path);

module.exports = db;