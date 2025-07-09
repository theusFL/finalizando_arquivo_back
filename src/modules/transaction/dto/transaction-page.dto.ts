import { TotalTransaction } from '../entities/total-transaction.entity';
import { Transaction } from '../entities/transaction.entity';

export class TransactionPageDto {
  page: number;
  totalTransactions: TotalTransaction;
  perPage: number;
  data: Transaction[];
  total: number;

  constructor(
    page: number,
    perPage: number,
    data: Transaction[],
    total: number,
    totalTransactions: TotalTransaction = new TotalTransaction(0, 0, 0),
  ) {
    this.page = page;
    this.perPage = perPage;
    this.data = data;
    this.total = total;
    this.totalTransactions = totalTransactions;
  }
}
