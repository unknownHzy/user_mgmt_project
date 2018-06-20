const express = require('express');
const User = require('../entities/user');

const router = express.Router();
const columns = ['id', 'user_name', 'age', 'country'];

/*
* user API：
*
* GET               /api/user/:id
* GET ALL           /api/users
* POST              /api/user/:id
* DELETE            /api/user/:id
* PUT               /api/user/:id/edit (这里理想是/api/user/:id)
* GET EDITED user   /api/user/:id/edit
* */

/*router.use('/users', function () {
    console.log('users...................');
});*/

/*router.use('/user', function () {
    console.log('user...user........user...user.....');
});*/


router.route('/user/:id')
    .all((req, res, next) => {
        console.log('router middleware: prehandle for all Http methods!');
        next();
    })
    .get((req, res) => {
        const user = new User({id: req.params.id});
        return user.query(columns, user)
            .then((result) => {
                console.log('RESTful: GET by Id...');
                console.log(result);
                res.render('user/view', {user: result[0]});
            })
            .catch((err) => {
                console.log(err.message);
            });
    })
    .put((req, res) => {
        const user = new User(req.body);
        return user.update(user)
            .then((results) => {
                console.log(results);
                console.log('RESTful: PUT...');
                res.redirect('/api/users');
            })
            .catch((err) => {
                console.log(err.message);
            });
    })
    .delete((req, res) => {
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
    });

//添加一个用户
router.route('/user')
    .post((req, res) => {
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
    });

//获取所有users
router.route('/users')
    .get((req, res) => {
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
    });

//点击页面中的edit user链接
router.route('/user/:id/edit')
    .get((req, res) => {
        const user = new User({id: req.params.id});
        return user.query(columns, user)
            .then((result) => {
                console.log('RESTful: GET by Id...');
                console.log(result);
                res.render('user/edit', {user: result[0]});
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

//提交edit过的用户信息
router.route('/user/:id/edit')
    .put((req, res) => {
        const user = new User(req.body);
        return user.update(user)
            .then((results) => {
                console.log(results);
                console.log('RESTful: PUT...');
                res.redirect('/api/users');
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

module.exports = router;
