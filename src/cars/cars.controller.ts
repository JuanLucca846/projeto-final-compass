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
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FindAllCarQueryParams } from './dto/car/findAllCarQueryParams.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../login/roles.decorator';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { roles } from '../login/dto/roles.enum';

@ApiTags('Auto Service > Client > Cars')
@Controller('clients/:id/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Post()
  create(@Body() createCarDto: CreateCarDto, @Param('id') id: string) {
    return this.carsService.create(createCarDto, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT, roles.MECHANIC)
  @Get()
  findAll(
    @Query() findAllCarQueryParams: FindAllCarQueryParams,
    @Param('id') id: string,
  ) {
    return this.carsService.findAll(findAllCarQueryParams, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT, roles.MECHANIC)
  @Get(':carId')
  findOne(@Param('id') id: string, @Param('carId') carId: string) {
    return this.carsService.findOne(id, carId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Patch(':carId')
  update(
    @Param('id') id: string,
    @Param('carId') carId: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, carId, updateCarDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Delete(':carId')
  @HttpCode(204)
  remove(@Param('id') id: string, @Param('carId') carId: string) {
    return this.carsService.remove(id, carId);
  }
}
