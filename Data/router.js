const { Router } = require('express')
const Data = require('./model')

const router = new Router()

router.get('/data', (req, res, next) => {
  Data.findAll()
    .then(data => res.json(data))
    .catch(err => next(err))
})

module.exports = router