const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const cors = require('cors')
const {uploadRouter} = require('./routes/file-uploader-routes')

main().catch(err => console.log(err));

app.use(cors())

async function main() {
  await mongoose.connect('mongodb+srv://troitsky:d8QQTCVuTFC2Bt9@cluster0.d8cld.mongodb.net/?retryWrites=true&w=majority');
}

app.use('/', uploadRouter)
app.use('/uploads', express.static("uploads"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})