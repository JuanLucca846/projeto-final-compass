import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllCarQueryParams {
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
  license_plate: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsString()
  @IsOptional()
  color: string;
}
