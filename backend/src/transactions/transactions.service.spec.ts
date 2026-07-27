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
});
