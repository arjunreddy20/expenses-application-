const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expenses_app', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); // Sync all models
})
.then(() => {
    console.log('Database & tables created!');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = sequelize;