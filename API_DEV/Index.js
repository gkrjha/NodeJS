const http=require('http')
const fs=require('fs')
const url=require('url');

const { json } = require('stream/consumers');

http.createServer((req,res)=>{
let pathurl=url.parse(req.url,true);
let product=fs.readFileSync("./product.json","utf-8");
let productArray=JSON.parse(product);


if(pathurl.pathname=='/product' && req.method=='GET' && pathurl.query.id==undefined){
  res.end(product);
}else if(pathurl.pathname=='/product' && req.method=='GET' && pathurl.query.id!=undefined){
  let stors=productArray.find((products)=>{
    return products.id==pathurl.query.id;
  })
  if(stors!=undefined){
  console.log(stors)
  res.end(JSON.stringify(stors))
  } 
  else { 
    res.end(JSON.stringify({"message":"Produvt not found"}))
  }

}
}).listen(8000)

// const http=require('http')
// const fs=require('fs')
// const url=require('url')


// http.createServer((req,res)=>{
//   let pathurl=url.parse(req.url,true)
//   let product=fs.readFileSync("./product.json",'utf-8')
//   let productArray=JSON.parse(product);
  
//   if(pathurl.pathname=='/product' && req.method=='GET' && pathurl.query.id==undefined){
//     res.end(product);
//   }else if(pathurl.pathname=='/product' && req.method=='GET' && pathurl.query.id!=undefined){
//     let stors=productArray.find((products)=>{
//       return products.id==pathurl.query.id;
//     })
//     if(stors!=undefined){
//     console.log(stors)
//     res.end(JSON.stringify(stors))
//     } 
//     else { 
//       res.end(JSON.stringify({"message":"Produvt not found"}))
//     }
//   }

//   if(pathurl.pathname=="/product" && req.method=="POST"){
//     let body = '';
//   req.on("data", (chunk) => {
//     body =body   + chunk;
//     });

//     req.on("end",()=>{
//       let newProduct = JSON.parse(body);
//       productArray.push(newProduct);
//       fs.writeFileSync("./Product.json", JSON.stringify(productArray), 'utf-8');
//       res.end(JSON.stringify({ "message": "Product received" }));
//     });
    
//   }

// }).listen(8000)