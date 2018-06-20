const mysql = require('./mysql/mysqlUtils');
const dbs = new Map([
    ['mysql', mysql]
]);

module.exports = dbs;
