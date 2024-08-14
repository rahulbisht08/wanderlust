const express = require('express')
const router = express.Router();

// INDEX ROUTE
router.get("/" ,(req,res)=>{
    res.send("get for user");
});

router.post("/" ,(req,res)=>{
    res.send("post for user");
});

module.exports = router;
