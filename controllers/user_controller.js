const User = require('../entities/user')

const columns = ['id', 'user_name', 'age', 'country'];

function getUser(req, res) {
	const user = new User({id: req.params.id});
    return user.query(columns, user)
        .then(result => {
            console.log('RESTful: GET by Id...');
            console.log(result);
            res.render('user/view', {user: result[0]});
        })
        .catch(err => {
            console.log(err.message);
        });
}

function updateUser(req, res) {
    const user = new User(req.body);
    return user.update(user)
        .then(results => {
            console.log(results);
            console.log('RESTful: PUT...');
            res.redirect('/api/users');
        })
        .catch(err => {
            console.log(err.message);
        });
}

function deleteUser(req, res) {
    const user = new User({id: req.params.id});
    return user.remove(user)
        .then(result => {
            console.log(result);
            console.log({title: 'RESTful: DELETE...'});
            res.redirect('/api/users');
        })
        .catch(err => {
            if (err.failType) {
                const {failType, failReason} = err;
                console.log(`failed: ${failType}, reason: ${failReason}`);
            }
        });
}

function addUser(req, res) {
    const user = new User(req.body);
    return user.save(user)
        .then(result => {
            console.log(result);
            res.json({title: 'RESTful: POST...'});
        })
        .catch(err => {
            if (err.failType) {
                const {failType, failReason} = err;
                console.log(`failed: ${failType}, reason: ${failReason}`);
            }
        });
}

function getUsers(req, res) {
    const user = new User({});
    return user.query(columns)
        .then(users => {
            console.log('RESTful: GET All...');
            res.render('user/users', {users});
        })
        .catch(err => {
            if (err.failType) {
                const {failType, failReason} = err;
                console.log(`failed: ${failType}, reason: ${failReason}`);
            }
        });
}

function editUser(req, res) {
    const user = new User({id: req.params.id});
    return user.query(columns, user)
        .then(result => {
            console.log('RESTful: GET by Id...');
            console.log(result);
            res.render('user/edit', {user: result[0]});
        })
        .catch(err => {
            console.log(err.message);
        });
}

function updateUser(req, res) {
    const user = new User(req.body);
    return user.update(user)
        .then(results => {
            console.log(results);
            console.log('RESTful: PUT...');
            res.redirect('/api/users');
        })
        .catch(err => {
            console.log(err.message);
        });
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    addUser,
    getUsers,
    editUser
};
