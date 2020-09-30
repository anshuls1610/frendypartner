const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: String,
  gender: String,
  education: String,
  searchquery:String,
  form_language:String,
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
module.exports = mongoose.model("Partner", partnerSchema);