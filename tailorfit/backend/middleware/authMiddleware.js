//// Checks JWT token in Authorization header


const jwt = require('jsonwebtoken');

const auth = (req,res ,next)=>{

    const authHeader = req.headers.authorization;

    //expect  "Bearer token"

    if (!authHeader && authHeader.startswith('Bearer ')){
        return res.status(402).json({
            success:false,
            message:"np token ,authorization denied",
            data:null
        });
    }
        const token = authHeader.split(" ")[1];
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // put admin info in req.user
            req.user ={id:decoded.id,email:decoded.email};
            next();
        }catch (error){
            return res.status(401).json({
                success:false,
                message:"token is not valid",
                data:null
            });

        }
    };
module.exports = auth;