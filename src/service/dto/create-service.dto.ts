import { IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { PartsDto } from './service/parts.dto';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  carId: string;

  @IsString()
  @IsNotEmpty()
  mechanicId: string;

  @IsString()
  @IsNotEmpty()
  serviceEstimatedDeliveryDate: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  parts: PartsDto[];

  @IsString()
  @IsNotEmpty()
  status: string;
}
