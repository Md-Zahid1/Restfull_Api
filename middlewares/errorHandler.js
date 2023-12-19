const errorHandler = (err, req, res, next) => {

    let statusCode = 500;
    let data = {
        message: "Internal servar error",
        originalError: err.message 
    }
    res.status().json({message: "something went wrong"})
}


export default errorHandler;