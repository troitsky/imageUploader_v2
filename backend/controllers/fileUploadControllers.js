const {Image} = require('../Models/image');

const saveImageToDB = async (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file)
    const saveImage = new Image({
        name: req.file.originalname,
        url: 'http://localhost:3000/uploads/' + req.file.filename
    })
    
    saveImage.save()
    .then(res => console.log('image is saved'))
    .catch(res => console.log('Error saving image: ', err))
    
    res.send(req.file)
}

const getAllImages = async (req, res) => {
    const allImages = await Image.find()
    res.send(allImages)
}

module.exports = {
    saveImageToDB,
    getAllImages
}
