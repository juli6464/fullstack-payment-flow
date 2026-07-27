import { Test, TestingModule } from '@nestjs/testing';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  const paymentsServiceMock = {
    processPayment: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: paymentsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process a payment', async () => {
    const dto = {
      transactionId: 'tx-1',
      cardHolder: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
    };

    const response = {
      success: true,
      transactionId: 'tx-1',
      status: 'APPROVED',
      message: 'Payment processed',
      providerReference: 'wompi-123',
    };

    paymentsServiceMock.processPayment.mockResolvedValue(response);

    const result = await controller.process(dto);

    expect(result).toEqual(response);
    expect(paymentsServiceMock.processPayment).toHaveBeenCalledWith(dto);
    expect(paymentsServiceMock.processPayment).toHaveBeenCalledTimes(1);
  });
});