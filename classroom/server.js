const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieparser = require("cookie-parser");


app.use(cookieparser("secretcode"));

app.get('/getSignedCookies', function (req, res) {
  res.cookie("greet" , "namaste" , {signed:true});
  res.send('signed cookie is sent');
})

app.get('/verify', function (req, res) {
  console.log(req.signedCookies)
  res.send("verified");
})



app.get('/greet', function (req, res) {
  let {name = "anonymous"} = req.cookies;
  res.send(`hi ${name}`);
})


app.get('/getcookies', function (req, res) {
  res.cookie("greet" , "namaste");
  res.send('cookies is working');
})

app.get('/', function (req, res) {
  console.dir(req.cookies);
    res.send('root is working');
  })

app.use("/users",users);
app.use("/posts",posts);


app.listen(3000 , ()=>{
    console.log("app is listening on port 3000");
})