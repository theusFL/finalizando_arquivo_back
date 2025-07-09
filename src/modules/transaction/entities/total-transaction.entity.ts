export class TotalTransaction {
  total: number;
  totalIncome: number;
  totalOutcome: number;

  constructor(total: number, totalIncome: number, totalOutcome: number) {
    this.total = total;
    this.totalIncome = totalIncome;
    this.totalOutcome = totalOutcome;
  }
}
