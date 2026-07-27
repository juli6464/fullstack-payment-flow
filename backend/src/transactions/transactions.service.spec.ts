import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const prismaMock = {
    product: {
      findUnique: jest.fn(),
    },
    customer: {
      upsert: jest.fn(),
    },
    delivery: {
      create: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    prismaMock.product.findUnique.mockResolvedValue({
      id: 'product-1',
      price: 50000,
      stock: 10,
    });

    prismaMock.customer.upsert.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.delivery.create.mockResolvedValue({
      id: 'delivery-1',
    });

    prismaMock.transaction.create.mockResolvedValue({
      id: 'transaction-1',
      reference: 'TX-123',
      status: 'PENDING',
      total: 65000,
    });

    const dto = {
      productId: 'product-1',

      customer: {
        fullName: 'John Doe',
        email: 'john@test.com',
        phone: '3001234567',
      },

      delivery: {
        address: 'Street 1',
        city: 'Manizales',
        department: 'Caldas',
        postalCode: '170001',
      },
    };

    const result = await service.create(dto);

    expect(result.id).toBe('transaction-1');
    expect(result.status).toBe('PENDING');
    expect(prismaMock.transaction.create).toHaveBeenCalled();
  });

  it('should throw NotFoundException when product does not exist', async () => {
    prismaMock.product.findUnique.mockResolvedValue(null);

    await expect(
      service.create({
        productId: '1',

        customer: {
          fullName: 'John',
          email: 'john@test.com',
          phone: '300',
        },

        delivery: {
          address: 'Street',
          city: 'City',
          department: 'Dept',
          postalCode: '170001',
        },
      }),
    ).rejects.toThrow(NotFoundException);
  });
  it('should throw BadRequestException when product is out of stock', async () => {
    prismaMock.product.findUnique.mockResolvedValue({
      id: '1',
      price: 10000,
      stock: 0,
    });

    await expect(
      service.create({
        productId: '1',

        customer: {
          fullName: 'John',
          email: 'john@test.com',
          phone: '300',
        },

        delivery: {
          address: 'Street',
          city: 'City',
          department: 'Dept',
          postalCode: '170001',
        },
      }),
    ).rejects.toThrow(BadRequestException);
  });
  it('should return one transaction', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: 'tx-1',
      reference: 'TX-123',
      status: 'PENDING',
      product: {},
      customer: {},
      delivery: {},
    });

    const result = await service.findOne('tx-1');

    expect(result.id).toBe('tx-1');
    expect(prismaMock.transaction.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'tx-1',
      },
      include: {
        product: true,
        customer: true,
        delivery: true,
      },
    });
  });

  it('should throw NotFoundException when transaction does not exist', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue(null);

    await expect(service.findOne('tx-999')).rejects.toThrow(NotFoundException);
  });

  it('should return all transactions', async () => {
    prismaMock.transaction.findMany.mockResolvedValue([
      {
        id: 'tx-1',
      },
      {
        id: 'tx-2',
      },
    ]);

    const result = await service.findAll();

    expect(result).toHaveLength(2);

    expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
      include: {
        product: true,
        customer: true,
        delivery: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  });
});
