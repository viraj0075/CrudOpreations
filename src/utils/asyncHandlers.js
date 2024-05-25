//with the Promise
const AsyncHandlers = (requestHandler) => {
    return (req,res,next) => {
     Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
};

export { AsyncHandlers };