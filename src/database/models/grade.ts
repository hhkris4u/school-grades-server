
import Sequelize from 'sequelize';
import { sequelize } from '../database';

const Grade = sequelize.define('grades', {
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

export { Grade as Grade }