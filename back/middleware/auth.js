const jws = require("jsonwebtoken");

module.exports = function(req, res, next){
  const token = req.header("token");
  if (!token) return res.status(401).json({message: "Auth Error"});
  try{
    const dec = jwt.verify(token, "randomString");
    req.user = dec.user;
    next();
  }
  catch(e){
      console.error(e);


      res.status(500).send({message; "Invalid token"});
    }
};


