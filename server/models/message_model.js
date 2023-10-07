import { Schema, model } from "mongoose";

const Message = new Schema({
    text: {type: String },
    author: { 
        id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        userName: { type: String, required: true}
    },
    timestamp: {type: Date, required: true},
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true},
    url: { type: String}
})

const MessageModel = model('Message', Message)

export default MessageModel