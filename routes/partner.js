const express = require("express");
const router	= express.Router();
const Partner = require('../models/partner');
const upload = require('../multer');
const path = require('path');

var searchquery="";

router.post("/partner",function(req,res){
  // console.log(req.body.languageButton);
    if (req.body.languageButton==="english"){
    res.sendFile(path.join(__dirname, '../english', '/form-1.html'))
  }
  else if(req.body.languageButton==="hindi"){
    res.sendFile(path.join(__dirname, '../hindi', '/form-1-hindi.html'))
  }
  else{
     res.sendFile(path.join(__dirname, '../gujarati', '/form-1-gujarati.html'))
  }
});

router.post("/form2-language",function(req,res){
  // console.log(req.body.languageButton);
  if (req.body.languageButton==="english"){
 res.sendFile(path.join(__dirname, '../english', '/form-2.html'))
  }
  else if(req.body.languageButton==="hindi"){
    res.sendFile(path.join(__dirname, '../hindi', '/form-2-hindi.html'))
  }
  else{
   res.sendFile(path.join(__dirname, '../gujarati', '/form-2-gujarati.html'))
  }
});

router.post("/form2-data", function (req, res) {
searchquery=req.body.form2mobile+req.body.form2first_name+req.body.form2last_name+req.body.form2age+req.body.form2gender+req.body.form2education
  const newPartner = new Partner({
    firstName: req.body.form2first_name,
    lastName: req.body.form2last_name,
    age: req.body.form2age,
    gender: req.body.form2gender,
    education: req.body.form2education,
    searchquery:req.body.form2mobile+req.body.form2first_name+req.body.form2last_name+req.body.form2age+req.body.form2gender+req.body.form2education,
    Address: {
      house: req.body.form2house,
      block: req.body.form2block,
      apartment: req.body.form2apartment,
      colony: req.body.form2colony,
      city: req.body.form2city,
      district: req.body.form2district,
      pincode: req.body.form2pincode,
      mobile: req.body.form2mobile,
      email: req.body.form2email,
    },
  });
  newPartner.save(()=>{
    if (req.body.languageButton==="english"){
		res.sendFile(path.join(__dirname, '../english', '/form-3.html'))
    }
    else if(req.body.languageButton==="hindi"){
      res.sendFile(path.join(__dirname, '../hindi', '/form-3-hindi.html'))
    }
    else{
       res.sendFile(path.join(__dirname, '../gujarati', '/form-3-gujarati.html'))
    }
  })
});

router.post("/form3-data",function(req,res){
    Partner.findOneAndUpdate({searchquery:searchquery},{
        form3:{
            occupation:req.body.form3occupation,
            business:req.body.form3business,
            eFrendyPartner:req.body.form3frendy_partner,
            smartPhone:req.body.form3smart_phone,
            payment:req.body.form3payment_mode,
            jointFamily:req.body.form3joint_family,
            flat:req.body.form3own_flat,
            How_long_you_have_been_staying_in_the_house:req.body.form3stay_house
        }
    },(err,data)=>{
        if(!err){
          if (req.body.languageButton==="english"){
            res.sendFile(path.join(__dirname, '../english', '/form-4.html'))
          }
          else if(req.body.languageButton==="hindi"){
           res.sendFile(path.join(__dirname, '../hindi', '/form-4-hindi.html'))
          }
          else{
            res.sendFile(path.join(__dirname, '../gujarati', '/form-4-gujarati.html'))
          }
        }
    })
})
router.post("/form4-data",function(req,res){
    Partner.findOneAndUpdate({searchquery:searchquery},{
        form4:{
            Does_your_society_has:req.body.form4society,
            If_flats_how_many_flats:req.body.form4flats,
            how_many_such_buildings:req.body.form4buildings,
            total_flats_or_houses:req.body.form4total_flats,
            have_a_whatsapp_group_for_residents:req.body.form4common_whatsapp,
            have_a_common_communication_platform_for_residents:req.body.form4common_platform
        }
    },function(err,data){
        if(!err){
          if (req.body.languageButton==="english"){
           res.sendFile(path.join(__dirname, '../english', '/form-5.html'))
          }
          else if(req.body.languageButton==="hindi"){
            res.sendFile(path.join(__dirname, '../hindi', '/form-5-hindi.html'))
          }
          else{
           res.sendFile(path.join(__dirname, '../gujarati', '/form-5-gujarati.html'))
          }
        }
    })
})
router.post("/form5-data", upload.single('signatureImage'), function(req, res, next){
	console.log(req.file)
    Partner.findOneAndUpdate({searchquery:searchquery},{
			form5:{
			signature: req.file.path,
            place:req.body.form5place,
            date:req.body.date
        }
    },function(err,data){
        if(!err){
          if (req.body.languageButton==="english"){
            res.render("success",{data:"Thank you for Registering with Frendy! We will contact you shortly!"})
          }
          else if(req.body.languageButton==="hindi"){
            res.render("success",{data:"फ्रेंडी के साथ पंजीकरण करने के लिए धन्यवाद! हम आपसे शीघ्र ही संपर्क करेंगे!"})
          }
          else{
            res.render("success",{data:"ફ્રેન્ડી સાથે નોંધણી કરવા બદલ આભાર! અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું!"})
          }
        }
    })
})

module.exports = router;