const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expenses_app', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL using Sequelize');
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });

module.exports = sequelize;