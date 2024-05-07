const http=require('http')
const fs=require('fs')
const url=require('url')


http.createServer((req,res)=>{
  let pathurl=url.parse(req.url,true)
  let productFlie=fs.readFileSync("./Product.json",'utf-8')
  let productArray=JSON.parse(productFlie);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,OPTIONS")
  
  if(pathurl.pathname=='/product' && req.method=='GET' && pathurl.query.id==undefined){
   
    res.end(productFlie);
    

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

  if(pathurl.pathname=="/product" && req.method=="POST"){
    let body = '';
  req.on("data", (chunk) => {
    body =body   + chunk;
    });

    req.on("end",()=>{
      let newProduct = JSON.parse(body);
      productArray.push(newProduct);
      fs.writeFileSync("./Product.json", JSON.stringify(productArray), 'utf-8');
      res.end(JSON.stringify({ "message": "Product received" }));
    });
    
  }

  if(pathurl.pathname=='/product' && req.method=='DELETE'){
    let newStors=productArray.findIndex((products)=>{
      return products.id==pathurl.query.id;
    })
    productArray.splice(newStors,1);
    fs.writeFileSync("./Product.json", JSON.stringify(productArray), 'utf-8');
    res.end(JSON.stringify({ "message": "Product Deleted" }));

  }
   





}).listen(8000)