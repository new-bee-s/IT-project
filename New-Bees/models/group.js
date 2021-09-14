const mongoose = require("mongoose")
const groupSchema = new mongoose.Schema({
    groupName: { type: String, require: true },
    groupMember: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group