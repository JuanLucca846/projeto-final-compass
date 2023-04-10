import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FindAllServiceQueryParams } from './dto/service/findAllServiceQueryParams.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../login/roles.decorator';
import { roles } from '../login/dto/roles.enum';

@ApiTags('Auto Service > Service')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC, roles.CLIENT)
  @Get()
  findAll(@Query() findAllServiceQueryParams: FindAllServiceQueryParams) {
    return this.serviceService.findAll(findAllServiceQueryParams);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC, roles.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }
}
