const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs=require("ejs");
const bodyParser = require("body-parser");
const upload = require('./multer');
const methodOverride 	= require("method-override");

const url = process.env.DATABASEURL || "mongodb://localhost:27017/form";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify : false,
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("Error: cd ", err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname+'/public'));
app.use('/uploads', express.static('uploads'));
app.set("view engine","ejs");

const partnerRoutes = require("./routes/partner");
const gatewayRoutes = require("./routes/gateway");
const adminRoutes = require("./routes/admin");
const editRoutes = require("./routes/edit");

app.use(partnerRoutes);
app.use(adminRoutes);
app.use(gatewayRoutes);
app.use(editRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The server has Started!");
});
