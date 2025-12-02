// error 404  error handler middleware

const notFound = (req ,res ,next)=>{
    res.status (404).json({
        success:false,
        Message:"raoute not found",
        data:null
    });
};

const errorHandler = (err ,req ,res ,next)=>{
    console.error("Error:", err);
    const status = err.status || 500;

    res.status(status).json({
        success:false,
        message:err.message || "Internal Server Error",
        data:null
    });
};
module.exports = {notFound ,errorHandler};  

    

