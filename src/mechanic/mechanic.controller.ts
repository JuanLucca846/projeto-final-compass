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
import { MechanicService } from './mechanic.service';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { FindAllMechanicQueryParams } from './dto/mechanic/findAllMechanicQueryParams.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { roles } from '../login/dto/roles.enum';
import { Roles } from '../login/roles.decorator';
import { JwtAuthGuard } from '../login/jwt-auth.guard';

@ApiTags('Auto Service > Mechanic')
@Controller('mechanics')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post()
  create(@Body() createMechanicDto: CreateMechanicDto) {
    return this.mechanicService.create(createMechanicDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Get()
  findAll(@Query() findAllMechanicQueryParams: FindAllMechanicQueryParams) {
    return this.mechanicService.findAll(findAllMechanicQueryParams);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mechanicService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMechanicDto: UpdateMechanicDto,
  ) {
    return this.mechanicService.update(id, updateMechanicDto);
  }
}
