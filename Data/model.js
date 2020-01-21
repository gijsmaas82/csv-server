const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
  id: {type: Sequelize.INTEGER, primaryKey: true},
  level: {type: Sequelize.STRING},
  cvss: {type: Sequelize.STRING},
  title: {type: Sequelize.STRING},
  Vulnerability: {type: Sequelize.STRING},
  Solution: {type: Sequelize.STRING},
  reference: {type: Sequelize.STRING}
},{
  timestamps: false
})

module.exports = Data