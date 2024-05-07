const mongoose=require("mongoose");
const express=require("express")
const bcrypt=require("bcryptjs");
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



const schema=mongoose.Schema({
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

const model=mongoose.model("pratics",schema)

app.post("/user",(req,res)=>{
  let user=req.body;
  bcrypt.genSalt(10,(err,salt)=>{
    if(!err){
      bcrypt.hash(user.password,salt,(err,hashpass)=>{
        if(!err){
          user.password=hashpass
          console.log(user.password)
          model.create(user).then((data)=>{
            console.log(data);
            res.send({messege:"inserted"})
          }).catch((err)=>{
            res.send({messege:"not inserted"})
          })
        }
      })
    }
  })
  
})

app.post("/login",(req,res)=>{
  let userCred=req.body;
  model.findOne({email:userCred.email}).then((user)=>{
    if(user!==null){
      bcrypt.compare(userCred.password,user.password,(err,result)=>{
        if(result==true){
          jwt.sign({email:userCred.email},"practickey",(err,token)=>{
            if(!err){
              console.log(token)
            }
          })
          res.send({messege:"login sucess"})
        }else{
          res.send({messege:" not login sucess"})
        }
      })
    }
  })
})

app.listen(8000,()=>{
  console.log("server up and running")
})