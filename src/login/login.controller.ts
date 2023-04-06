import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { TokenDto } from './dto/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';

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

  @Post('client/updatePassword')
  updateClientPassword(@Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.updateClientPassword(updateLoginDto);
  }

  @Post('mechanic/updatePassword')
  updateMechanicPassword(@Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.updateMechanicPassword(updateLoginDto);
  }

  @Post('client/refreshToken')
  refreshClientToken(@Body() tokenDto: TokenDto) {
    return this.loginService.refreshClientToken(tokenDto);
  }

  @Post('mechanic/refreshToken')
  refreshMechanicToken(@Body() tokenDto: TokenDto) {
    return this.loginService.refreshMechanicToken(tokenDto);
  }
}
