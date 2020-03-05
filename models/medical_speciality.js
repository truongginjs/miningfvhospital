'use strict';
module.exports = (sequelize, DataTypes) => {
  const medical_speciality = sequelize.define('medical_speciality', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {});
  medical_speciality.associate = function (models) {
    // associations can be defined here
  };
  return medical_speciality;
};