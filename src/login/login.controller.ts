import {
  Controller,
  Post,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { TokenDto } from './dto/refresh-token.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { roles } from './dto/roles.enum';
import { Db } from 'typeorm';

@ApiTags('Auto Service > Login')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('client/login')
  validateClient(@Body() loginDto: LoginDto) {
    return this.loginService.validateClient(loginDto.email, loginDto.password);
  }

  @Post('mechanic/login')
  validateMechanic(@Body() loginDto: LoginDto) {
    return this.loginService.validateMechanic(
      loginDto.email,
      loginDto.password,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Post('client/updatePassword')
  updateClientPassword(@Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.updateClientPassword(updateLoginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Post('mechanic/updatePassword')
  updateMechanicPassword(@Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.updateMechanicPassword(updateLoginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.CLIENT)
  @Post('client/refreshToken')
  refreshClientToken(@Body() tokenDto: TokenDto) {
    return this.loginService.refreshClientToken(tokenDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(roles.MECHANIC)
  @Post('mechanic/refreshToken')
  refreshMechanicToken(@Body() tokenDto: TokenDto) {
    return this.loginService.refreshMechanicToken(tokenDto);
  }
}
