import {
  IsString,
  IsOptional,
  IsDate,
  IsEmail,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindAllMechanicQueryParams {
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
  name: string;

  @IsString()
  @IsOptional()
  cpf: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthday: Date;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  hiringDate: Date;

  @IsNumber()
  @IsOptional()
  serviceRate: number;

  @IsString()
  @IsOptional()
  status: string;
}
