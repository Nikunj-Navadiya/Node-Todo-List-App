const express = require('express');

const app = express();

const port = 8000;  

app.set('view engine','ejs');

let record = []

app.use(express.urlencoded())

app.get('/',(req,res)=>{
    return res.render('table',{ 
        record
    })
})

app.get('/add',(req,res)=>{
    return res.render('form');
})

app.post('/insertRecord',(req,res)=>{
    let obj = {
        id : Math.floor(Math.random()*10000),
        task : req.body.task,
        status : req.body.status
    }
    record.push(obj);
    return res.redirect('/')
})

app.get('/deleterecord',(req,res)=>{
    let deleteid = req.query.id;
    let deleteData = record.filter(val => val.id != deleteid);
    record = deleteData;
    console.log("Record delete");
    return res.redirect('/') 
})

app.get('/editrecord',(req,res)=>{
    let editid = req.query.id;
    let single = record.find(val => val.id == editid);
    return res.render('edit',{
        single
    })
})

app.post('/updateRecord',(req,res)=>{
    let id = req.body.editid;
    let task =req.body.task;
    let status = req.body.status;
    let up = record.map((val,i)=>{
        if(val.id == id){
            val.task = task;
            val.status = status;
        }
        return val
    })
    record = up;
    console.log("record update");
    return res.redirect('/');
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is run port :- ${port}`);
})