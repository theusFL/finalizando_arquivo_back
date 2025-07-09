import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PaginationFilters } from './entities/pagination-filters';
import { TransactionPageDto } from './dto/transaction-page.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data,
        price,
        type,
      },
    });
    return createdTransaction;
  }

  async findPage(filters: PaginationFilters): Promise<TransactionPageDto> {
    const total = await this.prisma.transaction.count();
    const totalTransactions = await this.prisma.transaction.groupBy({
      by: ['type'],
      _sum: {
        price: true,
      },
    });
    const totalIncome =
      totalTransactions.find((transaction) => transaction.type === 'INCOME')
        ?._sum.price || 0;
    const totalOutcome =
      totalTransactions.find((transaction) => transaction.type === 'OUTCOME')
        ?._sum.price || 0;
    const totalBalance = totalIncome - totalOutcome;
    const pageInfo = new TransactionPageDto(
      filters.page,
      filters.perPage,
      [],
      total,
      {
        total: totalBalance,
        totalIncome: totalIncome,
        totalOutcome: totalOutcome,
      },
    );

    if (total === 0 || filters.skip >= total) {
      return pageInfo;
    }

    const transactions = await this.prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      skip: filters.skip,
      take: filters.take,
    });
    pageInfo.data = transactions;
    return pageInfo;
  }

  async findOne(id: string) {
    const foundTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return foundTransaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const foundTransaction = await this.findOne(id);

    if (!foundTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
    return updatedTransaction;
  }

  async remove(id: string) {
    const foundTransaction = await this.findOne(id);

    if (!foundTransaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
