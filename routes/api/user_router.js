const express = require('express');
const router = express.Router();

const user_controller = require('../../controllers/user_controller');

/*
* user API：
*
* GET               /api/users/:id
* GET ALL           /api/users
* POST              /api/users/:id
* DELETE            /api/users/:id
* PUT               /api/users/:id/edit (这里理想是/api/users/:id)
* GET EDITED user   /api/users/:id/edit
* */

router.route('/:id')
    .all((req, res, next) => {
        console.log('router middleware: prehandle for all Http methods!');
        next();
    })
    .get(user_controller.getUser)
    .put(user_controller.updateUser)
    .delete(user_controller.deleteUser);

//添加一个用户
router.route('/')
    .post(user_controller.addUser);

//获取所有users
router.route('/')
    .get(user_controller.getUsers);

//点击页面中的edit user链接
router.route('/:id/edit')
    .get(user_controller.editUser);

//提交edit过的用户信息
router.route('/:id/edit')
    .put(user_controller.updateUser);


module.exports = router;
