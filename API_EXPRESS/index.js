const exp=require('express');
const app= exp();

app.use(exp.json())
app.use(middleman)

// app.get("/products",(req,res)=>{
  
//   res.send({messege:"All product will be here soon"})
// })


// app.get("/products/:id",(req,res)=>{

//   res.send({messege:"got you product"})
// })


app.post("/products/:id",(req,res)=>{
 

  console.log(req.body)

  res.send({messege:"got you product....."})
})

app.delete("/products/:id",(req,res)=>{
  console.log(req.params.id);
  res.send({messege:"delete successfull"})
})

app.put("/products/:id",(req,res)=>{
  console.log(req.params.id);
  console.log(req.body);
  res.send(req.body)
})
// app.get("/user/:id",(req,res)=>{
//   console.log("get request called")
//   console.log(req.params.id)
//   res.send({messege:"user response"})
// })

// app.get("/testing/:id",(req,res)=>{
//   res.send({messege:"Product will print sortly"})
// })

function middleman(req,res,next){
  if(req.params.id<10){
    res.send({messege:"Product blocked"})
  }else{
    next()
  }
}

app.listen(8000,()=>{
  console.log("Server up and running")
  
})


