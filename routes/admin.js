const express = require("express");
const router	= express.Router();
const Partner = require('../models/partner');
const path = require('path');

const searchquery="";

const adminCredentials={
  adminUsername:"admin",
  adminPassword:"admin"
}

// start of admin routes 
router.get("/adminLogIn",function(req,res){
    res.render("../views/adminLogIn");
})
router.post("/adminLogIn",(req,res)=>{
  if(req.body.adminUsername===adminCredentials.adminUsername 
      && req.body.adminPassword===adminCredentials.adminPassword){
        Partner.find(function(err,data){
        res.render("showPartners",{data:data})
    })
      }
    else{
      res.render("../views/success",{data:"Please ensure you have entered correct username and password"})
    }
});

module.exports = router;