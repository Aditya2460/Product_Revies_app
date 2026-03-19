const jwt =require('jsonwebtoken');
const EnsureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];

    console.log(auth);
    
    if(!auth){
       return res.status(403)
        .json({message:"Unauthorized,JWT token is require"})
    }
    try {
        const decoded=jwt.verify(auth,process.env.JWT_SECRET)
        req.user=decoded;
        next();
    } catch (error) {
       return res.status(401)
        .json({message:"Unauthorized,JWT token is worng or expird"})
        
    }
}
module.exports=EnsureAuthenticated;