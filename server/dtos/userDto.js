export default class UserDto {
    id;
    userName;

    constructor(model){
        this.userName = model.userName;
        this.id = model._id 
    }
}