import {
  IsString,
  IsOptional,
  IsDate,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindAllClientQueryParams {
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
  cpf_cnpj: string;

  @IsString()
  @IsOptional()
  client_type: string;

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

  @IsString()
  @IsOptional()
  @MinLength(10)
  password: string;

  @IsString()
  @IsOptional()
  zipCode: string;

  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  number: string;

  @IsString()
  @IsOptional()
  neighbourhood: string;

  @IsString()
  @IsOptional()
  city: string;
}
