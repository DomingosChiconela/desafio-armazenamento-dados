const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt')



const User =  require('../model/user-model')


const signup = asyncHandler(async (req, res) => {


    const{name,email,password,passwordConfirmation} =  req.body

    if (!name || !email || !password || !passwordConfirmation){

      return  res.status(400).json({message:"The data entered is not valid."})
    }

    if(password !== passwordConfirmation){
      return  res.status(400).json({message:"The passwords do not match"})

    }

    try{
        const isexisteName = await User.findOne({name:name})
        const isexisteEmail = await User.findOne({email:email})

        if(isexisteName){
          return  res.status(400).json({message:"The name already exists"})

        }
        if(isexisteEmail){
          return  res.status(400).json({message:"The email already exists"})

        }


      const salt =  await bcrypt.genSalt(12)
      const passwordHash =  await bcrypt.hash(password,salt)

        await User.create(
        {name,
        email,
        password:passwordHash}
      )
        res.status(201).json({message:'user created'})

    }catch(error){
        res.status(500).json({message:error})
    }
  


  });
const login = asyncHandler(async (req, res) => {


  const {email,password} =  req.body


  const user = await User.findOne({email:email})
         
  if(!user){
      return res.status(404).json({message: "email not found"})
  }
  
  const checkPassword = await  bcrypt.compare(password, user.password)

  if(!checkPassword){
      return res.status(422).json({message: "invalid password"})
  }

  res.status(200).json({message:"authentication completed successfully",data: {id:user._id,name:user.name,email:user.email}})
  
   
  });





const getAllUser = asyncHandler(async (req, res) => {


  try{
    const users = await User.find().select('-password');

    res.status(200).json({ message: "All users", data: users })
  }catch(error){
    res.status(500).json({message:error})
  }
    


  
   
  });


const getUser = asyncHandler(async (req, res) => {

    const {id} =  req.params


    try{
      const user = await User.findById(id,'-password');

      if (!user) {
        return res.status(404).json({ message: "user not found " });
      }

    res.status(200).json({ message: "User", data: user })
    }catch(error){
      res.status(500).json({message:error})
    }



  
   
  });



  module.exports = {signup,login,getAllUser,getUser}