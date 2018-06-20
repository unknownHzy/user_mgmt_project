const mysql = require('mysql');
const Promise = require('bluebird');
const mysqlConfig = require('./mysqlConfig');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(() => {
    console.log('EXPRESS INFO: MYSQL is connected...');
});

function queryPromise(sql) {
    let shouldBeClosed = true;
    return new Promise((resolve, reject) => {
        return connection.query(sql, (error, results, fields) => {

            if (error) {
                shouldBeClosed = false;
                return reject(error);
            }
            return resolve(results);
        });
    })
    .finally(() => {
        if (shouldBeClosed) closeConnection();
    });
}

function closeConnection() {
    return connection.end((error) => {
        if (error) return Promise.reject(error);

        console.log('EXPRESS INFO: MYSQL connection closed...');
        return Promise.resolve();
    });
}

module.exports = queryPromise;
