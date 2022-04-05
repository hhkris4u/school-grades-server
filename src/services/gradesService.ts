import { Grade } from '../database/models/grade';
import { sequelize } from '../database/database';

class GradesService {
    constructor() {
    }

    public async fetchSchoolDataByName(schoolName: string) {
        try {
            let schoolsData = await Grade.findAll({
                attributes: ['schoolId', 'schoolName', 'studentName', 'studentGrade'],
                where: {
                    schoolName: schoolName
                }
            });
            return schoolsData;
        } catch (err) {
            throw err;
        }
    }

    public async createMany(schoolObjects: any) {
        try {
            let response = await Grade.bulkCreate(schoolObjects, { returning: ['schoolId'] }) // will return only the specified columns for each row inserted
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async fetchUniqueSchools() {
        try {
            const uniqueSchools = await sequelize.query('SELECT DISTINCT schoolName from grades;');
            return uniqueSchools[0];
        } catch (error) {
            throw error;
        }
    }
}

const gradesService = new GradesService();
export default gradesService;