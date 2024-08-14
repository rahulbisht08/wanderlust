const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({secret:"secretCode" ,
    resave:false,
    saveUninitialized:true
}));

app.use(flash());

app.use((req,res,next) =>{
    res.locals.errMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();

})



app.get('/register', (req, res) => {
    let {name="anonymous"} = req.query;
    req.session.name= name;
    if(name === "anonymous"){
    req.flash("error" ,"not registered");
    }
    else{
    req.flash("success" , "registered succefully");

    }
    res.redirect("/hello");
})

app.get("/hello" , (req,res) =>
     {
        res.render("page.ejs", {name:req.session.name});


})

// app.get('/reqcount', function (req, res) {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
//   })

// app.get('/test', function (req, res) {
//       res.send('test is working');
//     })



app.listen(3000 , ()=>{
    console.log("app is listening on port 3000");
})