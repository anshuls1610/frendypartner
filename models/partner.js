const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: String,
  gender: String,
  education: String,
  searchquery:String,
  form_language:String,
    house: String,
    block: String,
    apartment: String,
    colony: String,
    city: String,
    district: String,
    pincode: String,
    mobile: String,
    email: String,
    occupation:String,
    business:String,
    eFrendyPartner:String,
    smartPhone:String,
    payment:String,
    jointFamily:String,
    flat:String,
    How_long_you_have_been_staying_in_the_house:String,
    Does_your_society_has:String,
    If_flats_how_many_flats:String,
    how_many_such_buildings:String,
    total_flats_or_houses:String,
    have_a_whatsapp_group_for_residents:String,
    have_a_common_communication_platform_for_residents:String,
	signature:String,
    place:String,
    date:String,
    terms_and_conditions1:String,
    terms_and_conditions2:String,
    terms_and_conditions3:String
});
module.exports = mongoose.model("Partner", partnerSchema);