import { Router } from 'express'
import { allUsersHandler } from './user.controller'

const router = Router()

router.get('/', allUsersHandler)

export default router
