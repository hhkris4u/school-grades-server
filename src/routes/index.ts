
import bodyParser from 'body-parser';
import schoolRoutes from './schools';

import { Router } from 'express';

const jsonParser = bodyParser.json({ limit: "50mb" })
const expressRouter = Router();

const router = (app: any) => {
    app.get('/api', (req: any, res: any) => res.status(200).send({
        message: 'Welcome to the API!',
    }));

    app.use('/school', jsonParser, schoolRoutes);
    
};

export { router }