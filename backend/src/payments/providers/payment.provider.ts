import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import { PaymentPort, TransactionWithRelations } from '../ports/payment.port';
import { AcceptanceTokens } from '../interfaces/acceptance-tokens.interface';
import { generateIntegritySignature } from '../utils/signature.util';

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
    // Paso 1. Obtener tokens de aceptación
    const acceptanceTokens = await this.getAcceptanceTokens();

    console.log('Acceptance Token:', acceptanceTokens.acceptanceToken);

    console.log('Personal Auth Token:', acceptanceTokens.personalAuthToken);

    // Paso 2. Tokenizar la tarjeta
    const cardToken = await this.tokenizeCard(dto);

    console.log('Card Token:', cardToken);

    // Paso 3. Crear Payment Source
    const paymentSourceId = await this.createPaymentSource(
      acceptanceTokens,
      cardToken,
      transaction.customer.email,
    );

    console.log('Payment Source:', paymentSourceId);

    // Paso 4. Generar firma de integridad
    const amountInCents = Math.round(Number(transaction.total) * 100);

    const signature = generateIntegritySignature(
      transaction.reference,
      amountInCents,
      'COP',
      this.config.getOrThrow<string>('PAYMENT_INTEGRITY_KEY'),
    );

    console.log('Integrity Signature:', signature);

    // Paso 5. Crear la transacción en Wompi
    const wompiTransaction = await this.createTransaction(
      acceptanceTokens.acceptanceToken,
      paymentSourceId,
      signature,
      transaction,
    );

    console.log('Wompi Transaction:', wompiTransaction);

    const transactionStatus =
      await this.getTransactionStatus(
        wompiTransaction.wompiId,
      );

    console.log(
      'Transaction Status:',
      transactionStatus,
    );

    // Paso 6. Respuesta
    return {
      success: true,
      transactionId: dto.transactionId,
      status: transactionStatus.status as any,
      message: 'Payment processed',
      providerReference: transactionStatus.id,
    };
  }

  /**
   * Obtiene los tokens de aceptación del comercio
   */
  private async getAcceptanceTokens(): Promise<AcceptanceTokens> {
    const url = `${this.config.get<string>('PAYMENT_BASE_URL')}/merchants/${this.config.get<string>('PAYMENT_PUBLIC_KEY')}`;

    const response = await firstValueFrom(this.http.get(url));

    return {
      acceptanceToken: response.data.data.presigned_acceptance.acceptance_token,

      personalAuthToken:
        response.data.data.presigned_personal_data_auth.acceptance_token,
    };
  }

  /**
   * Tokeniza la tarjeta
   */
  private async tokenizeCard(dto: ProcessPaymentDto): Promise<string> {
    const url = `${this.config.get<string>('PAYMENT_BASE_URL')}/tokens/cards`;

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
    const url = `${this.config.get<string>('PAYMENT_BASE_URL')}/payment_sources`;

    try {
      const response = await firstValueFrom(
        this.http.post(
          url,
          {
            type: 'CARD',
            token: cardToken,
            customer_email: customerEmail,

            acceptance_token: acceptanceTokens.acceptanceToken,

            accept_personal_auth: acceptanceTokens.personalAuthToken,
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
  private async createTransaction(
    acceptanceToken: string,
    paymentSourceId: number,
    signature: string,
    transaction: TransactionWithRelations,
  ): Promise<{ wompiId: string; status: string }> {
    const amountInCents = Math.round(Number(transaction.total) * 100);

    const url = `${this.config.getOrThrow<string>('PAYMENT_BASE_URL')}/transactions`;

    try {
      const response = await firstValueFrom(
        this.http.post(
          url,
          {
            acceptance_token: acceptanceToken,
            amount_in_cents: amountInCents,
            currency: 'COP',
            customer_email: transaction.customer.email,

            payment_method: {
              type: 'CARD',
              installments: 1,
            },

            payment_source_id: paymentSourceId,
            reference: transaction.reference,
            signature,
          },
          {
            headers: {
              Authorization: `Bearer ${this.config.getOrThrow<string>('PAYMENT_PRIVATE_KEY')}`,
            },
          },
        ),
      );

      return {
        wompiId: response.data.data.id,
        status: response.data.data.status,
      };
    } catch (error: any) {
      console.error(
        'Create Transaction Error:',
        error.response?.data ?? error.message,
      );

      throw error;
    }
  }
  private async getTransactionStatus(
    wompiTransactionId: string,
  ): Promise<{
    id: string;
    status: string;
  }> {

    const url =
      `${this.config.getOrThrow<string>('PAYMENT_BASE_URL')}/transactions/${wompiTransactionId}`;

    try {

      const response = await firstValueFrom(
        this.http.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${this.config.getOrThrow<string>('PAYMENT_PRIVATE_KEY')}`,
            },
          },
        ),
      );

      return {
        id: response.data.data.id,
        status: response.data.data.status,
      };

    } catch (error: any) {

      console.error(
        'Get Transaction Error:',
        error.response?.data ?? error.message,
      );

      throw error;
    }
  }
}
