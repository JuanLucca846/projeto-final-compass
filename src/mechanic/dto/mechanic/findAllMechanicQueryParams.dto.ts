import { IsString, IsOptional, IsDate, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindAllMechanicQueryParams {
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
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  cpf: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthday: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  hiringDate: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  serviceFee: string;

  @ApiProperty({
    required: false,
    enum: ['active', 'inactive', 'vacations', 'busy'],
  })
  @IsString()
  @IsOptional()
  status: string;
}
