const mongoose=require('mongoose');

/*mongoose.connect('mongodb://localhost:27017/Expense',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});*/

var nameSchema = new mongoose.Schema({
    name:
    {   
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true

    },
   
    number:
    {
        type:String,
        required:true
    },

    city:
    {
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    }

});

var teacher=mongoose.model("teacher",nameSchema);

module.exports=teacher;



