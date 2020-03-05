'use strict';
const {Deferrable}=require('sequelize')
const doctor= require('./doctor')
module.exports = (sequelize, DataTypes) => {
  
  const working_hour = sequelize.define('working_hour', {
    day: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.TEXT
    },
    bar_id: {
      type: DataTypes.INTEGER,
      references: {
        model: doctor,
        key: 'id',
        deferrable: Deferrable.INITIALLY_DEFERRED
      }
    },
  }, {});
  working_hour.associate = function (models) {
    // associations can be defined here
  };
  return working_hour;
};