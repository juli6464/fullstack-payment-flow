import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Classic T-Shirt',
        description: '100% Cotton T-Shirt',
        image: 'https://picsum.photos/400/300?random=1',
        price: 90000,
        stock: 15,
      },
      {
        name: 'Premium Hoodie',
        description: 'Oversized Hoodie',
        image: 'https://picsum.photos/400/300?random=2',
        price: 180000,
        stock: 8,
      },
      {
        name: 'Baseball Cap',
        description: 'Adjustable Cap',
        image: 'https://picsum.photos/400/300?random=3',
        price: 45000,
        stock: 20,
      },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());