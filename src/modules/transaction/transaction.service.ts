import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createTransactionDto: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        price: Number(createTransactionDto.price)
      },
    });
  }

  async findAll(skip?: number, take?: number) {
    const transactions = await this.prisma.transaction.findMany({
      skip,
      take,
      orderBy: {
        data: 'desc',
      },
    });
    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    await this.findOne(id);

    return await this.prisma.transaction.update({
      where: { id },
      data: {
        ...updateTransactionDto,
        price: updateTransactionDto.price ? Number(updateTransactionDto.price) : undefined
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
