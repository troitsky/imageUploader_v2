require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const cors = require('cors')
const {uploadRouter} = require('./routes/file-uploader-routes')

main().catch(err => console.log(err));

app.use(cors())

async function main() {
  
// await mongoose.connect('mongodb://127.0.0.1:27017/imageUploaderDB');
  await mongoose.connect(`mongodb+srv://troitsky:${process.env.MONGO_DB_PASSWORD}@cluster0.d8cld.mongodb.net/image_uploader?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

app.use('/', uploadRouter)
app.use('/uploads', express.static("uploads"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})