import { Schema, model } from "mongoose";

const GroupSchema = new Schema({
    groupName: {type: String, required: true},
    removable: { type: Boolean},
    participants: [{user_id: String, role: String, _id: false}]
})

const GroupModel = model('Group', GroupSchema)

export default GroupModel