import { Schema, model } from "mongoose";

const TokenShema = new Schema({
    user: {type: Schema.Types.ObjectId,  ref: "User", required: true},
    refreshToken: {type: String, required: true}
})

const Tokens = model('Token', TokenShema)

export default Tokens