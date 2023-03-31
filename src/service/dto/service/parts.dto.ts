import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PartsDto {
  @IsString()
  @IsNotEmpty()
  partId: string;

  @IsNumber()
  @IsNotEmpty()
  qtd: number;
}
