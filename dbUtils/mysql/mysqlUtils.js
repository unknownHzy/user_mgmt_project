const mysql = require('mysql');
const config = require('./mysqlConfig');
const _ = require('lodash');

const pool = mysql.createPool(config);
const BASE_SQL = {
    INSERT: 'INSERT INTO ?? SET ?',
    REMOVE: 'DELETE FROM ??',
    UPDATE: 'UPDATE ?? SET ? WHERE ?',
    SELECT: 'SELECT ?? FROM ??'
};

let conn = null;

function getConnectionFromDbPool() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            console.log(`POOL: get connection, id = ${connection.threadId}`);
            if (err) {
                console.log(err.stack);
                return reject(handleError('connection', 'can not get connection'));
            }

            return resolve(connection);
        });
    });
}

function selectPromise(columns, tableName, conditions) {
    return (connection) => {
        return new Promise((resolve, reject) => {
            const sql = _.isEmpty(conditions) ? BASE_SQL.SELECT : `${BASE_SQL.SELECT} WHERE ?`;
            const query = connection.query(sql, [columns, tableName, conditions], (err, results, fields) => {
                console.log(`fields ${JSON.stringify(fields)}`);
                console.log(`SQL SELECT: ${query.sql}`);
                return err ? reject(err) : resolve(results);
            });
        });
    };
}

//standard: INSERT INTO tablename(columns…) VALUES(columnsValue...);
//mysql: INSERT INTO tablename SET column_name1 = value1, column_name2 = value2，…;
function insertPromise(sql, tableName, entity) {
    return (connection) => {
        return new Promise((resolve, reject) => {
            const query = connection.query(sql, [tableName, entity], (err, results) => {
                console.log(`SQL => ${query.sql}`);
                if (err) {
                    console.log(err.stack);
                    return reject(handleError('query', err.message));
                }
                return resolve(results);
            });
        });
    };
}

function deletePromise(tableName, conditions) {
    return (connection) => {
        return new Promise((resolve, reject) => {
            const sql = conditions ? `${BASE_SQL.REMOVE} WHERE ?` : BASE_SQL.REMOVE;
            const query = connection.query(sql, [tableName, conditions], (err, results) => {
                console.log(`SQL => ${query.sql}`);
                if (err) {
                    console.log(err.stack);
                    return reject(handleError('query', err.message));
                }
                return resolve(results);
            });
        });
    };
}

function updatePromise(sql, tableName, entity, id) {
    return (connection) => {
        return new Promise((resolve, reject) => {
            const query = connection.query(sql, [tableName, entity, id], (err, results) => {
                console.log(`SQL => ${query.sql}`);
                if (err) {
                    console.log(err.stack);
                    return reject(handleError('query', err.message));
                }
                return resolve(results);
            });
        });
    };
}

function handleError(failType, failReason) {
    return Object.assign({}, {failType, failReason});
}

function execute(action) {
    return getConnectionFromDbPool()
        .then(executeQuery(action))
        .finally(() => {
            conn.release();
        });
}

function executeQuery(action) {
    return connection => {
        return new Promise((resolve) => {
            conn = connection;
            const results = action(connection);
            resolve(results);
        });
    };
}

function insert(tableName, entity) {
    console.log('SQL INSERT');
    return execute(insertPromise(BASE_SQL.INSERT, tableName, entity));
}

function update(tableName, entity, id) {
    console.log('SQL UPDATE');
    return execute(updatePromise(BASE_SQL.UPDATE, tableName, entity, id));
}

function remove(tableName, conditions) {
    console.log('SQL DELETE');
    return execute(deletePromise(tableName, conditions));
}

function select(columns, tableName, conditions) {
    console.log('SQL SELECT');
    return execute(selectPromise(columns, tableName, conditions));
}

module.exports = {
    insert,
    remove,
    update,
    select
};
