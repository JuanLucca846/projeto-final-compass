import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FindAllCarQueryParams } from './dto/car/findAllCarQueryParams.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('clients/:id/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(
    @Body() createCarDto: CreateCarDto,
    @Param('id') id: string,
    license_plate: string,
  ) {
    return this.carsService.create(createCarDto, id, license_plate);
  }

  @Get()
  findAll(@Query() findAllCarQueryParams: FindAllCarQueryParams) {
    return this.carsService.findAll(findAllCarQueryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
