import { Router } from 'express'
import { allUsersHandler, createUserHandler } from './user.controller'

const router = Router()

router.get('/', allUsersHandler)
router.post('/', createUserHandler)

export default router
