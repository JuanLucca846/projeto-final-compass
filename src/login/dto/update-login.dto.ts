import { PartialType } from '@nestjs/swagger';
import { LoginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(LoginDto) {}
