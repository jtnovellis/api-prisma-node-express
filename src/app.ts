import { config } from 'dotenv'
config()
import express from 'express'
import { routes } from './routes'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
routes(app)

export default app
