import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Client } from 'src/db/entities/client.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<Client, 'password'>> {
    const user = await this.authService.validateClient(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
