import { Test, TestingModule } from '@nestjs/testing';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const transactionsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a transaction', async () => {
    const dto = {
      productId: 'product-1',
      customer: {
        fullName: 'John Doe',
        email: 'john@test.com',
        phone: '3001234567',
      },
      delivery: {
        address: 'Street 123',
        city: 'Manizales',
        department: 'Caldas',
        postalCode: '170001',
      },
    };

    const response = {
      id: 'tx-1',
      reference: 'TX-123',
      status: 'PENDING',
      total: 65000,
    };

    transactionsServiceMock.create.mockResolvedValue(response);

    const result = await controller.create(dto);

    expect(result).toEqual(response);
    expect(transactionsServiceMock.create).toHaveBeenCalledWith(dto);
    expect(transactionsServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should return all transactions', async () => {
    const transactions = [
      {
        id: 'tx-1',
        status: 'APPROVED',
      },
      {
        id: 'tx-2',
        status: 'PENDING',
      },
    ];

    transactionsServiceMock.findAll.mockResolvedValue(transactions);

    const result = await controller.findAll();

    expect(result).toEqual(transactions);
    expect(transactionsServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return one transaction', async () => {
    const transaction = {
      id: 'tx-1',
      status: 'APPROVED',
    };

    transactionsServiceMock.findOne.mockResolvedValue(transaction);

    const result = await controller.findOne('tx-1');

    expect(result).toEqual(transaction);
    expect(transactionsServiceMock.findOne).toHaveBeenCalledWith('tx-1');
    expect(transactionsServiceMock.findOne).toHaveBeenCalledTimes(1);
  });
});