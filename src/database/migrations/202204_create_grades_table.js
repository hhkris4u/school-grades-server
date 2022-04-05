const Sequelize = require('sequelize')

// All migrations must provide a `up` and `down` async functions

module.exports = {
  // `query` was passed in the `index.js` file
  up: async (query) => {
    console.log('1.Grades')
    await query.createTable('grades', {
      schoolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      schoolName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      studentName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      studentGrade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },
  down: async (query) => {
    await query.dropTable('grades')
  }
}