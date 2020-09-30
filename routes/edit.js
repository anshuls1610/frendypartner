const express = require("express");
const router	= express.Router();
const Partner = require('../models/partner');
const path = require('path');

//EDIT ROUTE
router.get("/partner/:id/edit", function(req,res){
	Partner.findById(req.params.id, function(err, foundPartner){
	res.render("partner/edit", {partner: foundPartner});	
	});
});

//UPDATE ROUTE
router.put("/:id", function(req,res){
	
	Partner.findByIdAndUpdate(req.params.id, req.body.partner ,function(err, foundPartner){
		if(err){
			res.redirect("/");
		} else{
			res.redirect("/");	
		}
	});
});


module.exports = router;