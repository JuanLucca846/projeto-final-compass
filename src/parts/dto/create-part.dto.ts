import { IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  qtd: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
