const path = require('path');
const fs = require('fs');
const basename = path.basename(module.filename);
const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json');
const dbConfig = config.database[process.env.NODE_ENV || 'development']
const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs.readdirSync(__dirname).filter(file => {
    return file !== basename;
}).forEach((file) =>{
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

db.token.belongsTo(db.user);
db.privilege.belongsTo(db.user);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;