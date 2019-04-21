import { Request, Response, Application } from 'express';
import express from 'express';
import morgan = require('morgan')
// const userRouter = require('./src/routers/user-router')


const BASE_URL = '/api/v1'
const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(morgan('tiny'))
// app.use(`${BASE_URL}/users/`, userRouter)

export default app
