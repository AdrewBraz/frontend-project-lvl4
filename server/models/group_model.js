import { Schema, model } from "mongoose";

const GroupSchema = new Schema({
    groupName: {type: String, required: true},
    participants: { type: Array}
})

const GroupModel = model('Group', GroupSchema)

export default GroupModel