import express from 'express'
import mongoose from 'mongoose';
import path from 'path'

const app = express();
const users=[];

mongoose.connect("mongodb://127.0.0.1:27017/",{dbName:"userDetails"}).then(c=>console.log("DataBase Connected")).catch((e)=>console.log(e))

const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
})

const Message = mongoose.model("Message",messageSchema);

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.get("/success",(req,res)=>{
    res.render("success.ejs")
})
// app.get("/add",async(req,res)=>{
//     await Message.create({name:"Abc",email:"abc@gmail.com"});
//     res.send("Nice")
    
// })

app.get("/users",(req,res)=>{
    res.json({
        users
    })
})

app.post("/send",async(req,res)=>{
    console.log(req.body)
    
    const messageData={name:req.body.name,email:req.body.email};
    await Message.create(messageData);
    console.log(messageData)
    res.redirect("/success")

})


app.listen(5000,()=>{
    console.log(`Server is running`)
})