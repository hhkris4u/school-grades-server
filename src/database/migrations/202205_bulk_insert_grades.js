import csv from 'csvtojson';
import path from 'path';
import gradesService from '../../services/gradesService';

module.exports = {
    up: async (query) => {
        const jsondata = await csv().fromFile(path.join(__dirname, '..', 'data.csv'));
        await gradesService.createMany(jsondata);
    },
    down: async (query) => {

    }
}