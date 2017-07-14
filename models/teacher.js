'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isUnique : (value, next) => {
          Teacher.find({
            where : {email : value},
            attributes : ['id']
          })
          .done((err,user) => {
            if(err)
            return next('Email address already in use!');
            next()
          })
        },
          isEmail : {msg : 'Email format is incorrect!'}
      }
    },
    subject_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Teacher;
};
