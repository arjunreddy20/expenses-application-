const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const { v4: uuidv4 } = require('uuid');

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userlogin',
            key: 'id'
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'forgot_password_requests',
    timestamps: true
});

module.exports = ForgotPasswordRequests;