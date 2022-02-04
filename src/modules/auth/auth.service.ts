import { Injectable } from '@nestjs/common';
import { ClientsService } from '../admin/clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Client } from 'src/db/entities/client.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateClient(
    email: string,
    pass: string,
  ): Promise<Omit<Client, 'password'>> {
    const client = await this.clientsService.findOneWithEmail(email);
    const encrypt = await bcrypt.compare(pass, client.password);
    if (client && encrypt) {
      const { password, ...result } = client;
      return result;
    }
    return null;
  }

  async generateTokens(
    user: Omit<Client, 'password'>,
  ): Promise<{ access_token: string }> {
    const payload = { role: user.role, sub: user.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get(
        'jwt.access_token.signOptions.expiresIn',
      ),
    });
    return { access_token: token };
  }

  // async getProfile(user) {
  //   const usr = await this.clientsService.findOne(user.id);
  //   return classToPlain<Client>(usr);
  // }
}
