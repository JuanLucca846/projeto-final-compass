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
import { ClientService } from './client.service';
import { FindAllClientQueryParams } from './dto/client/findAllClientQueryParams.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard';
import { Roles } from 'src/login/roles.decorator';
import { roles } from 'src/login/dto/roles.enum';

@ApiTags('Auto Service > Client')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Get()
  findAll(@Query() findAllClientQueryParams: FindAllClientQueryParams) {
    return this.clientService.findAll(findAllClientQueryParams);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }
}
