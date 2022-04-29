const router = require('koa-router')()
const util = require('../utils/util')
const Menu = require('../models/menuSchema')

router.prefix('/menus')

router.post('/operate', async(ctx) => {
    const { _id, action, ...params } = ctx.request.body;
    if (type == 'add') {

    } else if (type == 'edit') {

    } else {

    }
})