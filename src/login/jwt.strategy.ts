import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Client } from 'src/client/entities/client.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jfiodjiOHJFUSDIHFUSDIAOHFIONVOnfmdui',
    });
  }

  async validate(client): Promise<Client> {
    console.log('client', client);
    return client;
  }
}
