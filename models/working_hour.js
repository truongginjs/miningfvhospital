'use strict';
const { Deferrable } = require('sequelize')
const doctor = require('./doctor')
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.define('working_hour', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    day: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.TEXT
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: doctor,
        key: 'id',
        deferrable: Deferrable.INITIALLY_DEFERRED
      }
    },
  }, {});
  Model.associate = function (models) {
    // associations can be defined here
  };
  return Model;
};