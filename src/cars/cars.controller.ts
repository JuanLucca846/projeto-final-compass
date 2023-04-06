import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FindAllCarQueryParams } from './dto/car/findAllCarQueryParams.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auto Service > Client > Cars')
@Controller('clients/:id/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto, @Param('id') id: string) {
    return this.carsService.create(createCarDto, id);
  }

  @Get()
  findAll(
    @Query() findAllCarQueryParams: FindAllCarQueryParams,
    @Param('id') id: string,
  ) {
    return this.carsService.findAll(findAllCarQueryParams, id);
  }

  @Get(':carId')
  findOne(@Param('id') id: string, @Param('carId') carId: string) {
    return this.carsService.findOne(id, carId);
  }

  @Patch(':carId')
  update(
    @Param('id') id: string,
    @Param('carId') carId: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, carId, updateCarDto);
  }

  @Delete(':carId')
  @HttpCode(204)
  remove(@Param('id') id: string, @Param('carId') carId: string) {
    return this.carsService.remove(id, carId);
  }
}
