const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './uploads/') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, new Date().toISOString() + file.originalname) 
    } 
}); 
 
const fileFilter = (req, file, cb) =>{
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({ storage: storage, limits: {
	fileSize: 1024 * 1024 * 1 //accept only files upto 1mb
	},
	fileFilter: fileFilter
});

module.exports = upload;