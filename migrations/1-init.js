'use strict';

var Sequelize = require('sequelize');

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
    "name": "init",
    "created": "2020-03-04T15:17:30.934Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "doctors",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "medical_specialities",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "working_hours",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
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
