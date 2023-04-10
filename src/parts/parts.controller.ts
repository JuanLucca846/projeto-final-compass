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
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { FindAllPartQueryParams } from './dto/part/findAllPartQueryParams.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../login/roles.decorator';
import { roles } from '../login/dto/roles.enum';

@ApiTags('Auto Service > Parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Post()
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Get()
  findAll(@Query() findAllPartQueryParams: FindAllPartQueryParams) {
    return this.partsService.findAll(findAllPartQueryParams);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(id, updatePartDto);
  }
}
