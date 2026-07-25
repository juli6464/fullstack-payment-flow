import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import { PaymentPort } from '../ports/payment.port';

@Injectable()
export class PaymentProvider implements PaymentPort {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async processPayment(
    dto: ProcessPaymentDto,
  ): Promise<PaymentResponse> {

    // Paso 1
    const acceptanceToken = await this.getAcceptanceToken();

    console.log('Acceptance Token:', acceptanceToken);

    // Paso 2
    const cardToken = await this.tokenizeCard(dto);

    console.log('Card Token:', cardToken);

    // Por ahora seguimos respondiendo Mock
    return {
      success: true,
      transactionId: dto.transactionId,
      status: 'APPROVED',
      message: 'Mock payment approved',
      providerReference: 'MOCK-123456',
    };
  }

  /**
   * Obtiene el Acceptance Token del comercio
   */
  private async getAcceptanceToken(): Promise<string> {

    const url =
      `${this.config.get<string>('PAYMENT_BASE_URL')}/merchants/${this.config.get<string>('PAYMENT_PUBLIC_KEY')}`;

    const response = await firstValueFrom(
      this.http.get(url),
    );

    return response.data.data.presigned_acceptance.acceptance_token;
  }

  /**
   * Tokeniza la tarjeta
   */
  private async tokenizeCard(
    dto: ProcessPaymentDto,
  ): Promise<string> {

    const url =
      `${this.config.get<string>('PAYMENT_BASE_URL')}/tokens/cards`;

    const response = await firstValueFrom(
      this.http.post(
        url,
        {
          number: dto.cardNumber,
          exp_month: dto.expMonth,
          exp_year: dto.expYear,
          cvc: dto.cvc,
          card_holder: dto.cardHolder,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.get<string>('PAYMENT_PUBLIC_KEY')}`,
          },
        },
      ),
    );

    return response.data.data.id;
  }
}