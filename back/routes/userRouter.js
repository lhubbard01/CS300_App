const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const User = require("../User");

const userRouter = express.Router();

userRouter.post("/signup", [
                check("username", "P1")
                  .not()
                  .isEmpty(),
                check("email", "P2")
                  .isEmail(), 
                check("passowrd", "P3Pw")
                  .isLength({min: 6 })
                ],
  async (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty() ) {
        return res.status(400).json(
          {
            errors: errors.array()
          });
      }


    const {
      username, email, password 
    } = req.body;
    try{
      let user = await User.findOne({
        email
      });
      if (user){
        return res.status(400).json({"msg" : "ASSSS "});
      }

      user = new User({
      username, email, password
      
      });

      const s = await brypt.genSalt(10);
      user.password = await bcrypt.hash(password, s);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload, "randomString", {
          expiresIn : 10000,
        }, (err, token) => {
          if (err) throw err;
          res.status(200).json({token});
      }
      );
    } catch(err) {
        console.log(err.message);
        alert(err.message);
        res.status(500).send("saving error");
    }
  }
);

userRouter.post(
  "/login",
  [check("email", "p1")
      .isEmail(), 
   check("password", "P2PW")
      .isLength({min: 6})
  ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        res.status(400).json(
        {
          errors: errors.array()
        }
        );
      }
  const {email, password } = req.body;
  try{
    let user = await User.findOne({email});
    if (!user)
    {
      return res.status(400).json({msg:"AAHHHHH"});
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json(
        {
          msg: "sry buddy that password is wrong"
        }
      );
    }


  const payload = {user: {id: user.id} };

  jwt.sign(payload,
    "its the signin and its good", 
    {expiresIn: 3600}, 

    (err, token) => {
      if (err)
        throw err;
      res.status(200).json({token});
      });
  } catch( e) { console.error(e); alert(e.message); }
  }
  );
module.exports = userRouter;
