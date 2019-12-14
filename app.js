const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const passwordHash = require('password-hash');
const ejs=require('ejs');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const teacher=require('./Database/teacher_form_schema');
const attend=require('./Database/attendence');
//const expensetotal=require('./datafile/expense');
const student=require('./Database/student_form_schema');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));





mongoose.connect('mongodb://localhost:27017/Attendence',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});



app.get('/',(req,res)=>{
    res.render('select');
});
app.get('/teacher_login',(req,res)=>{
    res.render('teacher_login');
});
app.get('/teacher_register',(req,res)=>{
    res.render('teacher_register');
});
app.get('/student_login',(req,res)=>{
    res.render('student_login');
});
app.get('/student_register',(req,res)=>{
    res.render('student_register');
});

app.post("/add_teacher", async(req, res) => {
    var myData = req.body;
    var checkdata=await teacher.findOne({email:req.body.email});
    if(!checkdata){
    myData.password=passwordHash.generate(myData.password);
    mydata=new teacher(myData);
    //console.log(typeof(mydata));
    mydata.save()
        .then(item => {
           // res.send("item saved to database");
            res.render('teacher_login');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    }
    else{
        res.send("already used email");
    }
});


app.post('/check_teacher',async(req,res)=>{
    //var mylogindata=req.body;
    var teacherhere=await teacher.findOne({email:req.body.email});
    //console.log(teacherhere.password);
     if(teacherhere){
        // console.log('teacherfound');
       var valid=await passwordHash.verify(req.body.password,teacherhere.password);
       //console.log(valid);
       if(!valid){
           console.log('incorrect');
       }
       else{
          //id=teacherhere._id;
          //console.log(id);
           //res.render('yourexpense');
           console.log("you are a valid teacher");
           //res.render('performAction');
           var studentList=await student.find();
           if(studentList){
               //console.log(true)
               //console.log(client);
               console.log(studentList[0].name);
               res.render('show_students',{studentList});
           }
            else{
                console.log('not found');
            }
       }  
         }
     else{
         console.log('teacher not exist go to register');
     }
    
})








app.post("/add_student", async(req, res) => {
    var myData = req.body;
    var checkdata=await student.findOne({email:req.body.email});
    if(!checkdata){
    myData.password=passwordHash.generate(myData.password);
    mydata=new student(myData);
    mydata.save()
        .then(item => {
           // res.send("item saved to database");
            res.render('student_login');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    }
    else{
        res.send("already used email");
    }
});














app.post('/check_student',async(req,res)=>{
    //var mylogindata=req.body;
    var studenthere=await student.findOne({email:req.body.email});
    let id=studenthere._id;
    //console.log(id);
    //console.log(teacherhere.password);
     if(studenthere){
        // console.log('teacherfound');
       var valid=await passwordHash.verify(req.body.password,studenthere.password);
       //console.log(valid);
       if(!valid){
           console.log('incorrect');
       }
       else{
          //id=teacherhere._id;
          //console.log(id);
           //res.render('yourexpense');
           console.log("you are a valid student");
           var status=await attend.findOne({_id:id});
           //console.log(status);
           if(status){
               //console.log(" in the list");
               res.send(status.attend);
           }
           else{
            console.log(" in the list");
           }
       }  
         }
     else{
         console.log('student not exist go to register');
     }
    
})


/*app.get('/get_student_list',async(req,res)=>{
    //console.log(typeof(id));
    var studentList=await student.find();
    if(studentList){
        //console.log(true)
        //console.log(client);
        console.log(studentList[0].name);
        res.render('show_students',{studentList});
    }
     else{
         console.log('not found');
     }
});*/


app.post('/submit',async(req,res)=>{
    //console.log("you are in critical region");
    var newdata= req.body;
    //console.log(newdata);
    var attdata= new attend(newdata);
    //console.log(typeof(attendence1));
    attdata.save()
        .then(item => {
           // res.send("item saved to database");
          console.log("saved");
        })
        .catch(err => {
            console.log("not saved");
            res.status(400).send("unable to save to database");
        });
    
});







app.listen('3000',(res,err)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log("server is running");
    }
})