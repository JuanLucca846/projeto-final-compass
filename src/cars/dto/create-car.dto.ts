import { IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
