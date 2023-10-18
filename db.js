const mongoose=require("mongoose");
var mongoURL='mongodb+srv://admin:123@cluster0.yzzjv3p.mongodb.net/sk-room'
mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})
var connection=mongoose.connection
connection.on('error',()=>{
    console.log('db connection failed')
})
connection.on('connected',()=>{
    console.log('db connection success')
})
module.exports=mongoose