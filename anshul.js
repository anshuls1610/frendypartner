app.post("/form5", upload.single('signatureImage'), function(req, res, next){
	console.log(req.file)
    Partner.findOneAndUpdate({searchquery:searchquery},{
			form5:{
			signature: req.file.path,
            place:req.body.form5place,
            date:req.body.date
        }
    },function(err,data){
        if(!err){
            res.render("success",{data:"Thank you for Registering with Frendy! We will contact you shortly"})
        }
    })
})