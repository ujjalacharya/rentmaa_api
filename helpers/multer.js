const path= require("path");
const multer= require("multer");

//storage management for the file
//that will be uploaded
let userAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/avatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname))
    }
  })


 //management of the storage and the file that will be uploaded 
 //.single expects the name of the file input field
exports.uploadAvatar= multer({storage: userAvatar}).array("avatar");