import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response } from 'express';
import { PaginationFilters } from './entities/pagination-filters';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
  ) {
    const createdTransaction =
      await this.transactionService.create(createTransactionDto);
    res.status(HttpStatus.CREATED).send(createdTransaction);
    return;
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: PaginationFilters,
    @Res() res: Response,
  ) {
    if (!query.page) {
      query.page = 1;
    }
    if (!query.perPage) {
      query.perPage = 10;
    }
    const transactionsPage = await this.transactionService.findPage(query);
    return res.status(HttpStatus.OK).send(transactionsPage);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const foundTransaction = await this.transactionService.findOne(id);
    return res.status(HttpStatus.OK).send(foundTransaction);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Res() res: Response,
  ) {
    const updatedTransaction = await this.transactionService.update(
      id,
      updateTransactionDto,
    );
    return res.status(HttpStatus.OK).send(updatedTransaction);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.transactionService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
