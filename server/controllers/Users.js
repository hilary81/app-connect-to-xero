const Users = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getUsers = async(req, res)=>{
   try{
      const users = await Users.findAll()
      res.json(users);
   }catch(error){
      console.log(error);
   }
}

const Register = async(req, res) =>{
   const {name, email, password, confPassword} = req.body;

   const user =await Users.findOne({
      where:{
         email:req.body.email
      }
   })
   if(!user){
      if(password !== confPassword) return res.status(400).json({msg: "Password and confirm password not match!"});
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register successfully"});
 
       }catch(error){
         res.status(404).json({msg:"Register failed!"})
   }
}else{
    res.status(404).json({msg:'This email exists.'})
}
}

const Login = async(req, res) =>{
   try {
      const user = await Users.findOne({
          where:{
              email: req.body.email
          }
      });
      const match = await bcrypt.compare(req.body.password, user.password);
      if(!match) return res.status(400).json({msg: "Wrong Password"});
      const userId = user.id;
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
          expiresIn: '15s'
      });
      const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
          expiresIn: '1d'
      });
      await Users.update({refresh_token: refreshToken},{
          where:{
              id: userId
          }
      });
      res.cookie('refreshToken', refreshToken,{
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
      });
      res.json({ accessToken });
  } catch (error) {
      res.status(404).json({msg:"Email not found"});
  }
}

module.exports={
   getUsers,
   Register,
   Login
};

