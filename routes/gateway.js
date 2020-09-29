const express = require("express");
const router	= express.Router();
const Partner = require('../models/partner');
const path = require('path');

const searchquery="";

router.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, '..', '/language-gateway.html'))
});

router.post("/",(req,res)=>{
  const language=req.body.languageButton;
  if (language==="english"){
	  res.sendFile(path.join(__dirname, '../english', '/gateway.html'))
  }
  else if(language==="hindi"){
	   res.sendFile(path.join(__dirname, '../hindi', '/gateway-hindi.html'))
  }
  else{
	   res.sendFile(path.join(__dirname, '../gujarati', '/gateway-gujarati.html'))
  }
});

module.exports = router;