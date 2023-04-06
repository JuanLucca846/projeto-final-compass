import { IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { PartsDto } from './service/parts.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: '3c11cb80-d36c-11ed-875f-22165c0302a8' })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: 'ead0be08-d3f1-11ed-a33c-22165c0302a8' })
  @IsString()
  @IsNotEmpty()
  carId: string;

  @ApiProperty({ example: '095859ac-d402-11ed-b1cb-22165c0302a8' })
  @IsString()
  @IsNotEmpty()
  mechanicId: string;

  @ApiProperty({ example: '2023-04-05' })
  @IsString()
  @IsNotEmpty()
  serviceEstimatedDeliveryDate: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [PartsDto] })
  @IsNotEmpty()
  parts: PartsDto[];

  @ApiProperty({ example: 'open' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
