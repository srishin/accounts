module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        jobTitle: {
            type: DataTypes.STRING
        }
    }, {
            timestamps: false
        });
    return users;
};