export default class UserDto {
    id;
    userName;
    url;

    constructor(model){
        this.userName = model.userName;
        this.id = model._id;
        this.url = model.url;
    }
}