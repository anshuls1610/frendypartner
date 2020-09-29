const express = require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
const mongoose = require("mongoose");
const app = express();
const upload = require('./multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
app.use('/uploads', express.static('uploads'));
app.set("view engine","ejs");
const url = process.env.DATABASEURL || "mongodb://localhost:27017/FormDB";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify : false,
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The server has Started!");
});;

const partnerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: String,
  gender: String,
  education: String,
  searchquery:String,
  Address: {
    house: String,
    block: String,
    apartment: String,
    colony: String,
    city: String,
    district: String,
    pincode: String,
    mobile: String,
    email: String,
  },
  form3:{
    occupation:String,
    business:String,
    eFrendyPartner:String,
    smartPhone:String,
    payment:String,
    jointFamily:String,
    flat:String,
    How_long_you_have_been_staying_in_the_house:String,
  },
  form4:{
    Does_your_society_has:String,
    If_flats_how_many_flats:String,
    how_many_such_buildings:String,
    total_flats_or_houses:String,
    have_a_whatsapp_group_for_residents:String,
    have_a_common_communication_platform_for_residents:String,
  },
  form5:{
    signature:String,
    place:String,
    date:String
  }
});
const Partner = mongoose.model("Partner", partnerSchema);
var searchquery="";
var adminCredentials={
  adminUsername:"test123",
  adminPassword:"qwerty"
}
// app.listen("3000", function (req, res) {
//   console.log("Port 3000 is up and running");
// });
app.get("/", function (req, res) {
  res.sendFile( __dirname+"/language-gateway.html")
});
app.post("/",(req,res)=>{
  const language=req.body.languageButton;
  if (language==="english"){
    res.sendFile(__dirname+"/gateway.html");
  }
  else if(language==="hindi"){
    res.sendFile(__dirname+"/hindi/gateway-hindi.html")
  }
  else{
    res.sendFile(__dirname+"/gujarati/gateway-gujarati.html")
  }
}) 
// start of admin routes 
app.get("/adminLogIn",function(req,res){
    res.render("adminLogIn");
})
app.post("/adminLogIn",(req,res)=>{
  if(req.body.adminUsername===adminCredentials.adminUsername 
      && req.body.adminPassword===adminCredentials.adminPassword){
        Partner.find(function(err,data){
        res.render("showPartners",{data:data})
    })
      }
    else{
      res.render("success",{data:"Please ensure you have entered correct username and password"})
    }
})
// end of admin routes 
app.post("/partner",function(req,res){
  // console.log(req.body.languageButton);
    if (req.body.languageButton==="english"){
    res.sendFile(__dirname+"/form-1.html");
  }
  else if(req.body.languageButton==="hindi"){
    res.sendFile(__dirname+"/hindi/form-1-hindi.html")
  }
  else{
    res.sendFile(__dirname+"/gujarati/form-1-gujarati.html")
  }
})
app.post("/form2-language",function(req,res){
  // console.log(req.body.languageButton);
  if (req.body.languageButton==="english"){
    res.sendFile(__dirname+"/form-2.html");
  }
  else if(req.body.languageButton==="hindi"){
    res.sendFile(__dirname+"/hindi/form-2-hindi.html")
  }
  else{
    
    res.sendFile(__dirname+"/gujarati/form-2-gujarati.html")
  }
    // res.sendFile(__dirname+"/form-2.html")
})
app.post("/form2-data", function (req, res) {
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
      res.sendFile(__dirname+"/form-3.html");
    }
    else if(req.body.languageButton==="hindi"){
      res.sendFile(__dirname+"/hindi/form-3-hindi.html")
    }
    else{
      
      res.sendFile(__dirname+"/gujarati/form-3-gujarati.html")
    }
      // res.sendFile(__dirname+"/form-3.html")
  })
});

app.post("/form3-data",function(req,res){
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
            res.sendFile(__dirname+"/form-4.html");
          }
          else if(req.body.languageButton==="hindi"){
            res.sendFile(__dirname+"/hindi/form-4-hindi.html")
          }
          else{
            
            res.sendFile(__dirname+"/gujarati/form-4-gujarati.html")
          }
            // res.sendFile(__dirname+"/form-4.html")
        }
    })
})
app.post("/form4-data",function(req,res){
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
            res.sendFile(__dirname+"/form-5.html");
          }
          else if(req.body.languageButton==="hindi"){
            res.sendFile(__dirname+"/hindi/form-5-hindi.html")
          }
          else{
            
            res.sendFile(__dirname+"/gujarati/form-5-gujarati.html")
          }
          //  res.sendFile(__dirname+"/form-5.html")
        }
    })
})
app.post("/form5-data",function(req, res){
	// console.log(req.body)
    Partner.findOneAndUpdate({searchquery:searchquery},{
			form5:{
            place:req.body.form5place,
            date:req.body.date
        }
    },function(err,data){
        if(!err){
          if (req.body.languageButton==="english"){
            res.render("success",{data:"Thank you for Registering with Frendy! We will contact you shortly"})
          }
          else if(req.body.languageButton==="hindi"){
            res.render("success",{data:"Thank you for Registering with Frendy! We will contact you shortly HINDI"})
          }
          else{
            res.render("success",{data:"Thank you for Registering with Frendy! We will contact you shortly GUJARATI"})
          }
            // res.render("success",{data:"Thank you for Registering with Frendy! We will contact you shortly"})
        }
    })
})
