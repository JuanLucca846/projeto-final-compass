import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllServiceQueryParams {
  constructor(limit = '10', offset = '0') {
    this.limit = limit;
    this.offset = offset;
  }

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  offset: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  clientId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  carId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mechanicId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  serviceDeliveryDate: string;

  @ApiProperty({
    required: false,
    enum: ['open', 'in progress', 'blocked', 'delivered', 'cancelled'],
  })
  @IsString()
  @IsOptional()
  status: string;
}
