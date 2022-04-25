/**
 * 维护用户ID自增长表
 */

const mongoose = require('mongoose')
const couterSchema = mongoose.Schema({
    _id: String,
    sequence_value: Number
})

module.exports = mongoose.model("counter", couterSchema, "counters")