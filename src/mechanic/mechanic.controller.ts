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
import { MechanicService } from './mechanic.service';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { FindAllMechanicQueryParams } from './dto/mechanic/findAllMechanicQueryParams.dto';

@Controller('mechanics')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post()
  create(@Body() createMechanicDto: CreateMechanicDto) {
    return this.mechanicService.create(createMechanicDto);
  }

  @Get()
  findAll(@Query() findAllMechanicQueryParams: FindAllMechanicQueryParams) {
    return this.mechanicService.findAll(findAllMechanicQueryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mechanicService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMechanicDto: UpdateMechanicDto,
  ) {
    return this.mechanicService.update(id, updateMechanicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mechanicService.remove(+id);
  }
}
