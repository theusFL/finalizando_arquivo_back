import { Transaction } from '../entities/transaction.entity';

export class TransactionPageDto {
  page: number;
  perPage: number;
  data: Transaction[];
  total: number;

  constructor(
    page: number,
    perPage: number,
    data: Transaction[],
    total: number,
  ) {
    this.page = page;
    this.perPage = perPage;
    this.data = data;
    this.total = total;
  }
}
