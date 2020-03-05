'use strict';
const {Deferrable}=require('sequelize')
const medical_speciality= require('./medical_speciality')
module.exports = (sequelize, DataTypes) => {
  const doctor = sequelize.define('doctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING
  },
  image: {
      type: DataTypes.TEXT
  },
  language: {
      type: DataTypes.STRING
  },
  rank: {
      type: DataTypes.INTEGER
  },
  has_appointment: {
      type: DataTypes.STRING
  },
  speciality_id: {
      type: DataTypes.INTEGER,
      references: {
          model: medical_speciality,
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED
      }
  },
  term_permalink: {
      type: DataTypes.TEXT
  },
  doctor_speciality: {
      type: DataTypes.STRING
  },
  qualification: {
      type: DataTypes.TEXT
  }
  }, {});
  doctor.associate = function (models) {
    // associations can be defined here
  };
  return doctor;
};