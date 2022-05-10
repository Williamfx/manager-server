const router = require('koa-router')()
const util = require('../utils/util')
const Role = require('../models/roleSchema')

router.prefix('/roles')

// 查询所有角色列表查询
router.get('/alllist', async(ctx) => {
    try {
        const list = await Role.find({}, "_id roleName")
        ctx.body = util.success(list);
    } catch (error) {
        ctx.body = util.fail(`查询失败:${error.stack}`);
    }

})

//按页获取角色列表
router.get('/list', async(ctx) => {
    const { roleName } = ctx.request.query;
    const { page, skipIndex } = util.pager(ctx.request.query)
    try {
        let params = {}
        if (roleName) params.roleName = roleName;
        const query = Role.find(params)
        const list = await query.skip(skipIndex).limit(page.pageSize)
        const total = await Role.countDocuments(params);
        ctx.body = util.success({
            list,
            page: {
                ...page,
                total
            }
        })
    } catch (error) {
        ctx.body = util.fail(`查询失败：${error.stack}`)
    }
})

module.exports = router;