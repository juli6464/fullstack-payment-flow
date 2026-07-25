import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new transaction',
  })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
  })
  create(
    @Body()
    dto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all transactions',
  })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
  })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get transaction by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Transaction ID',
    example: 'cms0jdh070003sz2oi1rq3e0x',
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.transactionsService.findOne(id);
  }
}