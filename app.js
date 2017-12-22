var Sequelize = require("sequelize");

var sequelize = new Sequelize('Impactdb', 'nishant', 'Impact123', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
  
  });


  var User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
      }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  
  User.sync({force: true}).then(function () {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock',
      age:23
    });
  });