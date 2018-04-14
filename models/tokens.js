module.exports = function (sequelize, DataTypes) {
    const tokens = sequelize.define('token', {
        accountId: {
            type: DataTypes.STRING,
            unique: true
        },
        accessToken: {
            type: DataTypes.TEXT
        },
        refreshToken: {
            type: DataTypes.TEXT
        },
        accountType: {
            type: DataTypes.STRING
        }
    }, {
            timestamps: false
        });
    return tokens;
};