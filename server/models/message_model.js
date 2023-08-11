import { Schema, model } from "mongoose";

const Message = new Schema({
    text: {type: String, required: true},
    author: { type: String, required: true},
    timestamp: {type: Date, required: true},
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true}
})

const MessageModel = model('Message', Message)

export default MessageModel