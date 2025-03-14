import jwt from "jsonwebtoken";

const isAuthenticated = (req,res,next)=>{
  try {
    
    const token = req.cookies?.token;
        if(!token){
      res.status(401).json({
        message:"User is not authenticated",
        success:false
      })
      return;
    }

    const decode = jwt.decode(token,process.env.JWT_SECRET);
    if(!decode){
      res.status(401).json({
        message:"Send a valid token",
        success:false
      })
      return;
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error",
      success:false
    })

    return;
  }
}

export default isAuthenticated;