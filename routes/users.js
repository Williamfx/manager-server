/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')

//用户模块根路径/users/
router.prefix('/users')

//路径/users/login
router.post('/login', async(ctx) => {
    try {
        const { userName, userPwd } = ctx.request.body;
        /**
         * 返回数据库指定字段，有三种方式
         * 1、'userId userName userEmail state role deptId roleList'
         * 2、{userId: 1,_id: 0}  1代表返回，0代表不返回
         * 3、.select('userId')
         */
        const res = await User.findOne({
                userName,
                userPwd
            }, 'userId userName userEmail state role deptId roleList') //返回指定的数据字段，有上面的三种方式
        const data = res._doc;

        console.log('data=>', data)

        const token = jwt.sign({
            data: data,
        }, 'imooc', { expiresIn: '1h' })

        if (res) {
            data.token = token;
            ctx.body = util.success(data)
        } else {
            ctx.body = util.fail("账号或密码不正确")
        }
    } catch (error) {
        ctx.body = util.fail(error.msg)
    }
})
module.exports = router