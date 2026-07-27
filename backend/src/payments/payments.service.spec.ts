import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';

import { PAYMENT_PORT } from './ports/payment.port';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const prismaMock = {
    transaction: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    product: {
      update: jest.fn(),
    },
  };

  const paymentProviderMock = {
    processPayment: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: PAYMENT_PORT,
          useValue: paymentProviderMock,
        },
      ],
    }).compile();

    service = module.get(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process an approved payment', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: 'transaction-1',
      status: 'PENDING',
      productId: 'product-1',
      product: {},
      customer: {},
      delivery: {},
    });

    paymentProviderMock.processPayment.mockResolvedValue({
      status: 'APPROVED',
      providerReference: 'wompi-123',
    });

    prismaMock.transaction.update.mockResolvedValue({});

    prismaMock.product.update.mockResolvedValue({});

    const dto = {
      transactionId: 'transaction-1',
      cardHolder: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
    };

    const result = await service.processPayment(dto);

    expect(result.status).toBe('APPROVED');

    expect(paymentProviderMock.processPayment).toHaveBeenCalled();

    expect(prismaMock.transaction.update).toHaveBeenCalled();

    expect(prismaMock.product.update).toHaveBeenCalled();
  });

  it('should throw if transaction does not exist', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue(null);

    const dto = {
      transactionId: 'transaction-1',
      cardHolder: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
    };

    await expect(
      service.processPayment(dto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw if transaction was already processed', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: 'transaction-1',
      status: 'APPROVED',
    });

    const dto = {
      transactionId: 'transaction-1',
      cardHolder: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
    };

    await expect(
      service.processPayment(dto),
    ).rejects.toThrow(BadRequestException);
  });

  it('should not decrement stock when payment is declined', async () => {
    prismaMock.transaction.findUnique.mockResolvedValue({
      id: 'transaction-1',
      status: 'PENDING',
      productId: 'product-1',
      product: {},
      customer: {},
      delivery: {},
    });

    paymentProviderMock.processPayment.mockResolvedValue({
      status: 'DECLINED',
      providerReference: 'wompi-123',
    });

    prismaMock.transaction.update.mockResolvedValue({});

    const dto = {
      transactionId: 'transaction-1',
      cardHolder: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
    };

    const result = await service.processPayment(dto);

    expect(result.status).toBe('DECLINED');

    expect(prismaMock.product.update).not.toHaveBeenCalled();
  });
});