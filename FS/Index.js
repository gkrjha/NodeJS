// async way to read line

// const fs= require('fs');
// console.log('line 1')
// let data=fs.readFile('./Data.txt','utf-8',(err,data)=>{
// console.log(err)
// console.log(data)
// })
// console.log('line 2')



// fs.writeFileSync('./newFile',"apple")
// // fs.writeFileSync('./newFile',"eat apple ")
// fs.writeFile('./newFile',"mango",(err)=>{
// console.log(err)
// })


// fs.appendFile('./newFile',"\nMango is king of fruit",(err)=>{
//   console.log(err)
// });

const os=require('os')
console.log(os.platform())
console.log(os.hostname())
console.log(os.machine())