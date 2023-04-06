import { IsString } from 'class-validator';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMechanicDto {
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
  cpf: string;

  @ApiProperty({
    example: '1994-11-14',
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
    example: 'passwordaA@',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @ApiProperty({
    example: ['eletric', 'engine', 'geometry'],
  })
  @IsNotEmpty()
  specialities: string[];

  @ApiProperty({
    example: '2020-10-12',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  hiringDate: Date;

  @ApiProperty({
    example: '10',
  })
  @IsString()
  @IsNotEmpty()
  serviceFee: string;

  @ApiProperty({
    example: 'active',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
