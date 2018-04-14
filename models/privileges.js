module.exports = function (sequelize, DataTypes) {
    const privileges = sequelize.define('privilege', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        designation: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
            timestamps: false
        });
    return privileges;
};