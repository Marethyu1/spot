import { Request, Response, Application } from 'express';
import express from 'express';
import morgan = require('morgan')
import userRouter from "./src/routers/user-router"


const BASE_URL = '/api/v1'
const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/health', (req: Request, res: Response) => {
  res.send("Ok")
})

app.get('/health/db', (req: Request, res: Response) => {
  const { getDatabase } = require('./src/db/database-manager')
  try {
    getDatabase()
    res.send("OK")
  } catch (err) {
    res.status(500).send(err)
  }
})

app.use(morgan('tiny'))
app.use(`${BASE_URL}/users/`, userRouter)

export default app
