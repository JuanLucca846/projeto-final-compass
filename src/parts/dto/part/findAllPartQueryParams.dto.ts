import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllPartQueryParams {
  constructor(limit = '10', offset = '0') {
    this.limit = limit;
    this.offset = offset;
  }

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  offset: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  qtd: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  unitPrice: string;
}
