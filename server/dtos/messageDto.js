export default class MessageDto {
    id;
    text;
    author;
    groupId;
    timestamp


    constructor(model){
        this.author = model.author;
        this.id = model._id 
        this.text = model.text
        this.groupId = model.groupId
        this.timestamp = model.timestamp
    }
}