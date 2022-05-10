const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    roleName: String, //菜单名称
    remark: String,
    premissionList: {
        checkedKeys: [],
        halfCheckedkeys: []
    },
    "createTime": {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("role", userSchema, "roles")