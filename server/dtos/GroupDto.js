export default class GrouprDto {
    id;
    groupName;

    constructor(model){
        this.groupName = model.groupName;
        this.id = model._id 
    }
}