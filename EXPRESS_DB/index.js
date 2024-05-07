const express=require('express')
const mongoose=require('mongoose')
const app= express();

//middleware to read request data in post and put request and converet to js object
app.use(express.json());

// database connection

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


//Schema for  product

const productSchema=mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is mandantory"]
  },
  price:{
    type:Number,
    required:[true,"Price is mandantory"],
    min:9000,
    max:100000
  },
  quantity:{
    type:Number
  },
  catgory:{
    type:String,
    enum:["Clothing","Electronic","Household"]
  }
},{timestamps:true})


// model creation

const productModel=mongoose.model("products",productSchema);


//end point to create a product {POST}

app.post("/products",(req,res)=>{
 
  productModel.create(req.body)
  .then((document)=>{
    res.send({data:document,messege:"Product created"})
  })
  .catch((err)=>{
    console.log(err)
  })
  
})

//get 

app.get("/products/:id",(req,res)=>{

  productModel.findOne({_id:req.params.id})
  .then((products)=>{
    console.log(products)
    res.send(products)
  })
  .catch((err)=>{
    console.log(err)
    res.send({messege:"some problem"})
  })
})


//Delete
app.delete("/products/:id",(req,res)=>{
  productModel.deleteOne({_id:req.params.id}).then((info)=>{
    res.send({messege:"product delete"})
  })
})


// PUT

app.put("/products/:id",(req,res)=>{
  let product=req.body;
  productModel.updateOne({_id:req.params.id},product)
  .then((info)=>{
    res.send({messege:"product update"})
  }).catch((err)=>{
    console.log(err)
    res.send({messege:"some problem"})
  })
})

app.listen(8000,()=>{
  console.log("server up and running")
})