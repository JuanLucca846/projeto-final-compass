import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PartsDto {
  @ApiProperty({ example: '0276e348-f752-4b5a-b187-8164135e80e8' })
  @IsString()
  @IsNotEmpty()
  partId: string;

  @ApiProperty({ example: '4' })
  @IsNumber()
  @IsNotEmpty()
  qtd: number;
}
