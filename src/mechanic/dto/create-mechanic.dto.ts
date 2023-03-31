import { IsString } from 'class-validator';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMechanicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  specialities: string[];

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  hiringDate: Date;

  @IsString()
  @IsNotEmpty()
  serviceFee: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
