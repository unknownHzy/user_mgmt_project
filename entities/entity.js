const _ = require('lodash');
const dbs = require('../dbUtils/dbUtils');
const db = dbs.get('mysql');

function BaseEntity(tableName, id) {
    this.tableName = tableName;
    this.id = id;
}

BaseEntity.prototype.save = function (entity) {
    return db.insert(entity.tableName, removeTableNameFromEntity(entity));
};

BaseEntity.prototype.query = function (columns, {id} = {}) {
    const conditions = id ? {id} : Object.create(null);
    return db.select(columns, this.tableName, conditions);
};

BaseEntity.prototype.remove = function (entity) {
    return db.remove(entity.tableName, {id: entity.id});
};

BaseEntity.prototype.update = function (entity) {
    const id = {id: entity.id};
    return db.update(entity.tableName, removeIdFromEntity(removeTableNameFromEntity(entity)), id);
};

function removeTableNameFromEntity(entity) {
    return _.omit(entity, 'tableName');
}

function removeIdFromEntity(entity) {
    return _.omit(entity, 'id');
}

module.exports = {
    BaseEntity,

    //only for testing
    removeTableNameFromEntity
};
