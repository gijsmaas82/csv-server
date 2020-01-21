const express = require('express')
const csvRouter = require('./Data/router')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs');
const csv = require('csv');
const Data = require('./Data/model')

const port = process.env.PORT || 5000

const app = express()
app.use(cors())

app.use(csvRouter)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'upload')
  },
    filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    const input = fs.createReadStream('./upload/data.csv');
    const parser = csv.parse({
      delimiter: ',',
      columns: true
    })
    const transform = csv.transform(function(row) {
    const resultObj = {
      id: row['id'],
      level: row['level'],
      cvss: row['cvss'],
      title: row['title'],
      Vulnerability: row['Vulnerability'],
      Solution: row['Solution'],
      reference: row['reference']
    }
    Data.create(resultObj)
      .then(function() {
        console.log('Record created')
      })
      .catch(function(err) {
        console.log('Error encountered: ' + err)
      })
    })
    input.pipe(parser).pipe(transform)
    fs.unlinkSync('./upload/data.csv')
    return res.status(200).send(req.file)
  })
})

app.listen(port, () => console.log('Port on:', port))
