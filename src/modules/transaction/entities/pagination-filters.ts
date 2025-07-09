import { IsInt, IsPositive, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationFilters {
  @Type(() => Number)
  @IsInt({ message: 'Page must be a integer' })
  @IsPositive({ message: 'Page must be a positive integer' })
  page: number = 1;

  @Type(() => Number)
  @IsInt({ message: 'Per page must be a integer' })
  @Min(10, { message: 'Per page must be at least 10' })
  @Max(100, { message: 'Per page must be less than or equal to 100' })
  perPage: number = 10;

  get skip(): number {
    return (this.page - 1) * this.perPage;
  }

  get take(): number {
    return this.perPage;
  }
}
