const mongoose=require("mongoose")
const express=require("express")
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
 const app= express();
 app.use(express.json())

 mongoose.connect("mongodb://localhost:27017/ExpressDB",
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
).then(()=>{
  console.log("Connection successfull")
}).catch((err)=>{
  console.log(err)
})

//schema for user

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
},{timestamp:true})

//user model

const userModel=mongoose.model("user-auth",userSchema)

//end poind to create a user {POST}

app.post("/regidter",(req,res)=>{
  let user=req.body;
  bcrypt.genSalt(10,(err,salt)=>{
    if(!err){
      bcrypt.hash(user.password,salt,(err,hpass)=>{
        if(!err){
          user.password=hpass;
          userModel.create(user).then((document)=>{
            res.send({data:document,messege:"user created"})
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      })
    }
  })
})


//Login end point  (Post) bcz we are sending data

app.post("/login",(req,res)=>{
  let userCred=req.body;
 
  userModel.findOne({email:userCred.email}).then((user)=>{
    if(user!==null){
      bcrypt.compare(userCred.password,user.password,(err,result)=>{
        if(result===true){
          // generate a token aand send it back
           
          jwt.sign({email:userCred.email},"codekey",(err,token)=>{
            if(!err){
              res.send({token:token})
            }
          })


        }else{
          res.send({messege:"invalid login password"})
        }
      })
    }else{
      res.send({messege:"invalid email"})
    }
    

  }).catch((err)=>{
    console.log(err)
    res.send({messege:"User not Found"})
  })
})

app.get("/getdata",verifytoken,(req,res)=>{
  res.send({messege:"i m a bad developer"})
})

function verifytoken(req,res,next){
  let token=req.headers.authorization.split(" ")[1]
  jwt.verify(token,"codekey",(err,data)=>{
    if(!err){
      console.log(data)
      next();
    }else{
      res.status(401).send({messege:"Plz login agan"})
    }
  })
  res.send({messege:"ullu banaya tum ko"})
 
}

app.listen(8000,()=>{
  console.log("server up and running")
})