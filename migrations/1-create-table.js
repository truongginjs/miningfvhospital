'use strict';

var {Sequelize,DataTypes,Deferrable} = require('sequelize');
var doctor = require('../models/doctor');
var medical_speciality= require('../models/medical_speciality')
/**
 * Actions summary:
 *
 * createTable "doctors", deps: []
 * createTable "medical_specialities", deps: []
 * createTable "working_hours", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "create-table",
    "created": "2020-03-05T17:05:48.902Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "doctors",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            name1: {
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
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            deletedAt: { type: Sequelize.DATE }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "medical_specialities",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            }, 
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            deletedAt: { type: Sequelize.DATE }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "working_hours",
        {
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
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            deletedAt: { type: Sequelize.DATE }
        },
        {}
    ]
}
];

module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
