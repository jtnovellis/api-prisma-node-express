import express from 'express'
import userRouter from './api/user'

export function routes(app: express.Application) {
  app.use('/api/users', userRouter)
}
