import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = Array.from({ length: 20 }, () => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }
})

async function main() {
  console.log(`Start seeding ...`)
  for (let user of users) {
    const newUser = await prisma.user.create({
      data: {
        ...user,
        posts: {
          create: { title: faker.lorem.sentence() },
        },
        profile: {
          create: { bio: faker.lorem.paragraph() },
        },
      },
    })
    console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
