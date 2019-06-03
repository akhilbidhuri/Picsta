var multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
module.exports = {
    uploadSingle : multer({
        storage: storage
      }).single('postFile')
}