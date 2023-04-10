import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Client } from '../client/entities/client.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Mechanic } from '../mechanic/entities/mechanic.entity';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { TokenDto } from './dto/refresh-token.dto';
import { JwtDecodeClient } from './dto/jwt-decodeClient.dto';
import { JwtDecodeMechanic } from './dto/jwt-decodeMechanic.dto';
import { roles } from './dto/roles.enum';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
    private jwtService: JwtService,
  ) {}

  async validateClient(email: string, password: string) {
    const client = await this.clientRepository.findOne({
      where: { email: email },
    });

    const checkPass = await bcrypt.compare(password, client.password);
    if (!checkPass || !client) {
      throw new UnauthorizedException('Invalid login or password');
    }

    client.password = '';
    const plain = instanceToPlain(client);
    const clientRole = {
      ...plain,
      role: roles.CLIENT,
    };
    const token = await this.jwtService.sign(clientRole);

    return {
      token,
    };
  }

  async validateMechanic(email: string, password: string) {
    const mechanic = await this.mechanicRepository.findOne({
      where: { email: email },
    });

    const checkPass = await bcrypt.compare(password, mechanic.password);
    if (!checkPass || !mechanic) {
      throw new UnauthorizedException('Invalid login or password');
    }

    mechanic.password = '';
    const plain = instanceToPlain(mechanic);
    const mechanicRole = {
      ...mechanic,
      role: roles.MECHANIC,
    };
    const token = await this.jwtService.sign(mechanicRole);

    return {
      token,
    };
  }

  async updateClientPassword(updateLoginDto: UpdateLoginDto) {
    const findClientPass = await this.clientRepository.findOne({
      where: { email: updateLoginDto.email },
    });

    if (!findClientPass) {
      throw new NotFoundException('Client not found');
    }

    const updateClientPass = await this.clientRepository.save({
      ...findClientPass,
      ...updateLoginDto,
      password: await bcrypt.hash(updateLoginDto.password, 10),
    });

    updateClientPass.password = '';

    return updateClientPass;
  }

  async updateMechanicPassword(updateLoginDto: UpdateLoginDto) {
    const findMechanicPass = await this.mechanicRepository.findOne({
      where: { email: updateLoginDto.email },
    });

    if (!findMechanicPass) {
      throw new NotFoundException('Mechanic not found');
    }

    const updateMechanicPass = await this.mechanicRepository.save({
      ...findMechanicPass,
      ...updateLoginDto,
      password: await bcrypt.hash(updateLoginDto.password, 10),
    });

    updateMechanicPass.password = '';

    return updateMechanicPass;
  }

  async refreshClientToken(tokenDto: TokenDto) {
    const jwtDecode = (await this.jwtService.decode(
      tokenDto.access_token,
    )) as JwtDecodeClient;
    const client = await this.clientRepository.findOne({
      where: { email: jwtDecode.email },
    });
    const plain = instanceToPlain(client);
    const refresh = this.jwtService.sign(plain);
    console.log(jwtDecode);
    return {
      access_token: refresh,
    };
  }

  async refreshMechanicToken(tokenDto: TokenDto) {
    const jwtDecode = (await this.jwtService.decode(
      tokenDto.access_token,
    )) as JwtDecodeMechanic;
    const mechanic = await this.mechanicRepository.findOne({
      where: { email: jwtDecode.email },
    });
    console.log(jwtDecode);
    const plain = instanceToPlain(mechanic);
    const refresh = await this.jwtService.sign(plain);
    return {
      access_token: refresh,
    };
  }
}
