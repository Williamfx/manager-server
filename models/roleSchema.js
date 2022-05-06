const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    roleName: String, //菜单名称
    menuState: Number, //菜单状态
    parentId: [mongoose.Types.ObjectId],
    "createTime": {
        type: Date,
        default: Date.now()
    },
    //更新时间
    "updateTime": {
        type: Date,
        default: Date.now()
    }, //创建时间
    remark: String
})

module.exports = mongoose.model("role", userSchema, "roles")