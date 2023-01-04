const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const cors = require('cors')
const {uploadRouter} = require('./routes/file-uploader-routes')

main().catch(err => console.log(err));

app.use(cors())

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/imageUploaderDB');
}

app.use('/', uploadRouter)
app.use('/uploads', express.static("uploads"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})