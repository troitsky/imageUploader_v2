const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.').shift() + '-' +  new Date().toISOString().replace(/:/g, '-') + '.' + file.mimetype.split('/')[1])
  },
  fileFilter: fileFilter
})

function  fileFilter(req, file, cb) {
  const extension = file.originalname.toLowerCase().split('.').pop();
  const mimetype = file.mimetype;
  if (
      extension === 'jpg' ||
      extension === 'jpeg' ||
      extension === 'png' ||
      mimetype === 'image/png' ||
      mimetype === 'image/jpg' ||
      mimetype === 'image/jpeg'
  ) {
      cb("file type is ok", true);
  } else {
      cb("error in file type", false);
  }
}

const upload = multer({ storage: storage, limits: {fileSize: 20971520} })

module.exports = {
    upload
}