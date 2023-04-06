import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  color: string;
}
