const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function clearDatabase() {
    console.log('Clearing database...');
    await prisma.user.deleteMany(); // Deletes all users
}

async function seedUsers() {
    console.log('Seeding users...');
    
    for (let i = 0; i < 3; i++) {
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.username(),
                name: faker.person.fullName(),
                bio: faker.lorem.sentence(),
                profileImage: faker.image.avatar(),
                location: faker.location.city(),
                role: 'USER',
                status: 'ACTIVE',
                lastLogin: faker.date.past(),
            },
        });
    }

    console.log('Seeding complete.');
}

async function main() {
    await clearDatabase();  // First, clear tables
    await seedUsers();      // Then, seed new data
    await prisma.$disconnect();
}

main().catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
