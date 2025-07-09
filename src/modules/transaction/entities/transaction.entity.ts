import { TransactionType } from './transaction-type.entity';

export class Transaction {
  id: string;
  title: string;
  price: number;
  category: string;
  data: Date;
  createdAt: Date;
  updatedAt: Date;
  type: (typeof TransactionType)[keyof typeof TransactionType];
}
