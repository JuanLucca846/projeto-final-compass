import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePartDto {
  @ApiProperty({ example: 'Commom tyre' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'just a commom tyre' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @ApiProperty({ example: '100.00' })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
