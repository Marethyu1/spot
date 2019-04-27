import express, { Request, Response, Application } from 'express'
import morgan from 'morgan'

const BASE_URL = '/api/v1';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('OK')
});

app.get('/health', (req: Request, res: Response) => {
    res.send('OK')
});

app.use(morgan('tiny'));

export default app



