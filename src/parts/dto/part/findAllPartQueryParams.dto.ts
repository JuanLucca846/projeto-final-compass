import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllPartQueryParams {
  constructor(limit = '10', offset = '0') {
    this.limit = limit;
    this.offset = offset;
  }

  @ApiProperty()
  @IsString()
  @IsOptional()
  offset: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  qtd: string;

  @IsString()
  @IsOptional()
  unitPrice: string;
}
