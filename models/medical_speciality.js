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

  return Model;
};