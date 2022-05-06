const router = require('koa-router')()
const util = require('../utils/util')
const Role = require('../models/roleSchema')

router.prefix('/roles')

// 角色列表查询
router.get('/list', async(ctx) => {
    const { roleName } = ctx.request.query;
    const params = {}
    if (roleName) params.roleName = roleName;
    let rootList = await Role.find(params) || []
})


//菜单编辑、删除、新增功能
router.post('/operate', async(ctx) => {
    const { _id, action, ...params } = ctx.request.body;
    let res, info;
    try {
        if (action == 'create') {
            res = await Role.create(params)
            info = '创建成功'
        } else if (action == 'edit') {
            params.updateTime = new Date();
            res = await Role.findByIdAndUpdate(_id, params);
            info = '编辑成功'
        } else {
            res = await Role.findByIdAndRemove(_id)
            await Role.deleteMany({ parentId: { $all: [_id] } })
            info = '删除成功'
        }
        ctx.body = util.success('', info);
    } catch (error) {
        ctx.body = util.fail('', error.stack);
    }
})

module.exports = router;