import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { of } from 'rxjs';

import { PaymentProvider } from './payment.provider';
import { ProcessPaymentDto } from '../dto/process-payment.dto';

jest.mock('../utils/signature.util', () => ({
  generateIntegritySignature: jest.fn(() => 'fake-signature'),
}));

describe('PaymentProvider', () => {
  let provider: PaymentProvider;

  const httpService = {
    get: jest.fn(),
    post: jest.fn(),
  };

  const configService = {
    get: jest.fn((key: string) => {
      const values: Record<string, string> = {
        PAYMENT_BASE_URL: 'https://sandbox.wompi.co/v1',
        PAYMENT_PUBLIC_KEY: 'public-key',
        PAYMENT_PRIVATE_KEY: 'private-key',
      };

      return values[key];
    }),

    getOrThrow: jest.fn((key: string) => {
      const values: Record<string, string> = {
        PAYMENT_BASE_URL: 'https://sandbox.wompi.co/v1',
        PAYMENT_PRIVATE_KEY: 'private-key',
        PAYMENT_INTEGRITY_KEY: 'integrity-key',
      };

      return values[key];
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentProvider,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    provider = module.get(PaymentProvider);
  });

  it('should process payment successfully', async () => {
    httpService.get
      .mockReturnValueOnce(
        of({
          data: {
            data: {
              presigned_acceptance: {
                acceptance_token: 'accept-token',
              },
              presigned_personal_data_auth: {
                acceptance_token: 'personal-token',
              },
            },
          },
        }),
      )

      .mockReturnValueOnce(
        of({
          data: {
            data: {
              id: 'wompi-123',
              status: 'APPROVED',
            },
          },
        }),
      );

    httpService.post
      .mockReturnValueOnce(
        of({
          data: {
            data: {
              id: 'card-token',
            },
          },
        }),
      )

      .mockReturnValueOnce(
        of({
          data: {
            data: {
              id: 15,
            },
          },
        }),
      )

      .mockReturnValueOnce(
        of({
          data: {
            data: {
              id: 'wompi-123',
              status: 'APPROVED',
            },
          },
        }),
      );

    const dto: ProcessPaymentDto = {
      transactionId: 'tx-1',
      cardHolder: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
    };

    const transaction: any = {
      reference: 'REF123',
      total: '50000',
      customer: {
        email: 'john@test.com',
      },
    };

    const result = await provider.processPayment(dto, transaction);

    expect(result.success).toBe(true);
    expect(result.status).toBe('APPROVED');
    expect(result.providerReference).toBe('wompi-123');
  });
});