const Sequelize = require('sequelize')

const db = new Sequelize('data', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

db.sync({ force: true })
  .then(console.log('db connected'))
  .catch(console.error)
  
  
module.exports = db