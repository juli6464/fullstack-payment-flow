import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import {
  PaymentPort,
  TransactionWithRelations,
} from '../ports/payment.port';
import { AcceptanceTokens } from '../interfaces/acceptance-tokens.interface';

@Injectable()
export class PaymentProvider implements PaymentPort {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async processPayment(
    dto: ProcessPaymentDto,
    transaction: TransactionWithRelations,
  ): Promise<PaymentResponse> {
  // Paso 1
  const acceptanceTokens = await this.getAcceptanceTokens();

  console.log(
    'Acceptance Token:',
    acceptanceTokens.acceptanceToken,
  );

  console.log(
    'Personal Auth Token:',
    acceptanceTokens.personalAuthToken,
  );

  // Paso 2
  const cardToken = await this.tokenizeCard(dto);

  console.log('Card Token:', cardToken);

  const paymentSourceId =
  await this.createPaymentSource(
    acceptanceTokens,
    cardToken,
    transaction.customer.email,
  );

  console.log(
    'Payment Source:',
    paymentSourceId,
  );
    // Por ahora seguimos respondiendo Mock
    return {
      success: true,
      transactionId: dto.transactionId,
      status: 'PENDING',
      message: 'Payment source created successfully',
      providerReference: paymentSourceId.toString(),
    };
  }

  /**
   * Obtiene los tokens de aceptación del comercio
   */
  private async getAcceptanceTokens(): Promise<AcceptanceTokens> {

    const url =
      `${this.config.get<string>('PAYMENT_BASE_URL')}/merchants/${this.config.get<string>('PAYMENT_PUBLIC_KEY')}`;

    const response = await firstValueFrom(
      this.http.get(url),
    );

    return {
      acceptanceToken:
        response.data.data.presigned_acceptance.acceptance_token,

      personalAuthToken:
        response.data.data.presigned_personal_data_auth.acceptance_token,
    };
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
  private async createPaymentSource(
    acceptanceTokens: AcceptanceTokens,
    cardToken: string,
    customerEmail: string,
  ): Promise<number> {

    const url =
      `${this.config.get<string>('PAYMENT_BASE_URL')}/payment_sources`;

    try {

      const response = await firstValueFrom(
        this.http.post(
          url,
          {
            type: 'CARD',
            token: cardToken,
            customer_email: customerEmail,

            acceptance_token:
              acceptanceTokens.acceptanceToken,

            accept_personal_auth:
              acceptanceTokens.personalAuthToken,
          },
          {
            headers: {
              Authorization: `Bearer ${this.config.get<string>('PAYMENT_PRIVATE_KEY')}`,
            },
          },
        ),
      );

      return response.data.data.id;

    } catch (error: any) {

      console.error(
        'Payment Source Error:',
        error.response?.data ?? error.message,
      );

      throw error;
    }
  }
}