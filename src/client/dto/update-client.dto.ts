import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '704.631.340-79',
  })
  @IsString()
  @IsNotEmpty()
  cpf_cnpj: string;

  @ApiProperty({
    example: 'PF',
  })
  @IsString()
  @IsNotEmpty()
  client_type: string;

  @ApiProperty({
    example: '1994-10-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({
    example: '(95) 98343-7116',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'john.doe@provider.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @ApiProperty({
    example: '93950-000',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    example: 'Rua Oliveiras',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    example: '1A',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 'União',
  })
  @IsString()
  @IsNotEmpty()
  neighbourhood: string;

  @ApiProperty({
    example: 'Porto Alegre',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
}
