import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const prismaMock = {
    product: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products = [
      {
        id: '1',
        name: 'T-Shirt',
        price: 50000,
        stock: 5,
      },
      {
        id: '2',
        name: 'Cap',
        price: 30000,
        stock: 10,
      },
    ];

    prismaMock.product.findMany.mockResolvedValue(products);

    const result = await service.findAll();

    expect(result).toEqual(products);

    expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
  });
});