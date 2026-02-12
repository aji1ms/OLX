import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const categories = [
        { name: 'Mobiles', slug: 'mobiles' },
        { name: 'Cars', slug: 'cars' },
        { name: 'Bikes', slug: 'bikes' },
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Property', slug: 'property' }
    ]

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        })
    }
    console.log('Categories seeded successfully!')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())