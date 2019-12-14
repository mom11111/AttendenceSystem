const mongoose=require('mongoose');

/*mongoose.connect('mongodb://localhost:27017/Expense',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});*/

var nameSchema = new mongoose.Schema({
   _id:{
       type:String
   },
   attend:{
       type:String
   }
});

var attend=mongoose.model("attend",nameSchema);

module.exports=attend;



