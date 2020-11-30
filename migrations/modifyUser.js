'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint(
                "Users",
                {
                    fields: ["email"],
                    type: "unique",
                    name: 'emailUnique'
                }
            )
        ])
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint(
                "Users",
                'emailUnique'
            )
        ])
    }
};