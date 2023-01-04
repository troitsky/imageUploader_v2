const express = require('express')
const uploadRouter = express.Router()
const {upload} = require('../helpers/multerFileUpload')
const {saveImageToDB, getAllImages} = require('../controllers/fileUploadControllers')

uploadRouter.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
uploadRouter.post('/uploadImage', upload.single('image'), saveImageToDB)
  
uploadRouter.get('/images/', getAllImages)

module.exports = {uploadRouter}