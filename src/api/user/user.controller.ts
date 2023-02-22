import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

async function allUsersHandler(req: Request, res: Response) {
  const limit = req.query.limit || 5
  const page = req.query.page || 0

  const skip = Number(limit) * (Number(page) - 1)

  try {
    const allUsers = await prisma.user.count()
    const users = await prisma.user.findMany({
      take: Number(limit),
      skip,
      orderBy: {
        id: 'asc',
      },
    })

    if (!users) {
      return res.status(404).json({ message: 'No users found' })
    }
    const currentPage = Math.ceil(skip / Number(limit)) + 1
    const finalPage = Math.ceil(allUsers / Number(limit))
    const hasNextPage = currentPage < finalPage
    const hasPreviousPage = currentPage > 1

    return res.status(200).json({
      message: 'Users found',
      total: allUsers,
      page: currentPage,
      hasNextPage,
      hasPreviousPage,
      data: users,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}

async function createUserHandler(req: Request, res: Response) {
  const { name, email } = req.body
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        posts: {
          create: { title: faker.internet.email() },
        },
        profile: {
          create: { bio: faker.lorem.sentence() },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User could not be created' })
    }
    return res.status(200).json({ message: 'User created', data: user })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}

export { allUsersHandler, createUserHandler }
