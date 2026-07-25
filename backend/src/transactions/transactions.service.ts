import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PAYMENT_CONSTANTS } from '../common/constants/payment.constants';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    // 1. Buscar el producto
    const product = await this.prisma.product.findUnique({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Validar stock
    if (product.stock <= 0) {
      throw new BadRequestException('Product out of stock');
    }

    // 3. Buscar o crear el cliente
    const customer = await this.prisma.customer.upsert({
      where: {
        email: dto.customer.email,
      },
      update: {
        fullName: dto.customer.fullName,
        phone: dto.customer.phone,
      },
      create: {
        fullName: dto.customer.fullName,
        email: dto.customer.email,
        phone: dto.customer.phone,
      },
    });

    // 4. Crear dirección de entrega
    const delivery = await this.prisma.delivery.create({
      data: {
        address: dto.delivery.address,
        city: dto.delivery.city,
        department: dto.delivery.department,
        postalCode: dto.delivery.postalCode,
      },
    });

    // 5. Calcular costos
    const BASE_FEE = 5000;
    const DELIVERY_FEE = 10000;

    const total =
      Number(product.price) +
      PAYMENT_CONSTANTS.BASE_FEE +
      PAYMENT_CONSTANTS.DELIVERY_FEE;

    // 6. Generar referencia
    const reference = `TX-${Date.now()}`;

    // 7. Crear la transacción
    const transaction = await this.prisma.transaction.create({
      data: {
        reference,
        status: 'PENDING',

        productAmount: product.price,
        baseFee: PAYMENT_CONSTANTS.BASE_FEE,
        deliveryFee: PAYMENT_CONSTANTS.DELIVERY_FEE,
        total,

        productId: product.id,
        customerId: customer.id,
        deliveryId: delivery.id,
      },
    });

    // 8. Respuesta
    return {
      id: transaction.id,
      reference: transaction.reference,
      status: transaction.status,
      total: transaction.total,
    };
  }
  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        customer: true,
        delivery: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        product: true,
        customer: true,
        delivery: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
