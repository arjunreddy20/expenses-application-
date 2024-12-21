const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPremiumUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    total_expenses: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'userlogin',
    timestamps: false
});

// Add the findByEmail method
User.findByEmail = async function(email) {
    return await User.findOne({ where: { email } });
};

// Add the findById method
User.findById = async function(id) {
    return await User.findOne({ where: { id } });
};

module.exports = User;