export default class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.message = message
    }

    static UnauthorizedError(){
        console.log('somehtins')
        return new ApiError(401, 'User is unauthorized')
    }

    static BadRequest(message, errors){
        return new ApiError(400, message, errors)
    }
}