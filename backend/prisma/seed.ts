import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Classic T-Shirt',
        description: '100% Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        price: 90000,
        stock: 15,
      },
      {
        name: 'Premium Hoodie',
        description: 'Oversized Hoodie',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        price: 180000,
        stock: 8,
      },
      {
        name: 'Baseball Cap',
        description: 'Adjustable Cap',
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800',
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