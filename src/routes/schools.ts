
import { Router } from 'express';
import gradesService from '../services/gradesService';

const router = Router();

router.get('/getinfo/:schoolName', async (req, res, next) => {
    try {
        const data = await gradesService.fetchSchoolDataByName(req.params.schoolName);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/fetchunique', async (req, res, next) => {
    try {
        const data = await gradesService.fetchUniqueSchools();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;