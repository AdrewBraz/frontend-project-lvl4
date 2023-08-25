import ApiError from "../exceptions/api-errors";

export default (error, req, reply) => {
    if(error instanceof ApiError){
        reply.status(error.status).send({message: error.message, errors: error.errors})
    }
    console.log(error)
    reply.status(500).send({message: 'Unhandled error'})
}