'use strict';
module.exports = (Sequelize, DataTypes) => {
  const Model = Sequelize.define('medical_speciality', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
  }, 
  {});
  Model.associate = function (models) {
    // associations can be defined here
  };
  return Model;
};