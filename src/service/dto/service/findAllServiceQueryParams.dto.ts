import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllServiceQueryParams {
  constructor(limit = '10', offset = '0') {
    this.limit = limit;
    this.offset = offset;
  }

  @ApiProperty()
  @IsString()
  @IsOptional()
  offset: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  clientId: string;

  @IsString()
  @IsOptional()
  carId: string;

  @IsString()
  @IsOptional()
  mechanicId: string;

  @IsString()
  @IsOptional()
  serviceDeliveryDate: string;

  @IsString()
  @IsOptional()
  status: string;
}
