import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllCarQueryParams {
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
  license_plate: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  year: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  manufacturer: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  color: string;
}
