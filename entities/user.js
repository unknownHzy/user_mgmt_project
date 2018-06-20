const {BaseEntity} = require('./entity');
const tableNames = require('../dbUtils/tableNamesConstant');

function User({userName, age, country, id}) {
    BaseEntity.call(this, tableNames.USERS, id); //继承BaseEntity
    this.user_name = userName;//undefined的case还没有处理
    this.age = age;
    this.country = country;
}


//prototype chain: User.prototype --> created object --> BaseEntity.prototype
//是不是应该采用 User.prototype = BaseEntity.prototype; prototype chain: User.prototype --> BaseEntity.prototype
User.prototype = Object.create(BaseEntity.prototype);
User.prototype.constructor = User;

module.exports = User;
