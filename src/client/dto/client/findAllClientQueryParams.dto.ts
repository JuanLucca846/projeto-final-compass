import {
  IsString,
  IsOptional,
  IsDate,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindAllClientQueryParams {
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
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  cpf_cnpj: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  client_type: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthday: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  zipCode: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  street: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  number: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  neighbourhood: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city: string;
}
