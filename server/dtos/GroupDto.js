export default class GrouprDto {
    id;
    groupName;
    removable;

    constructor(model){
        this.groupName = model.groupName;
        this.id = model._id;
    }
}