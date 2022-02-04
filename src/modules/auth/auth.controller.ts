import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from '../client/clients/dto/create-client.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth Module - Auth Controller')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {}

  @ApiBody({
    type: CreateClientDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.generateTokens(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/profile')
  // getProfile(@Request() req) {
  //   return this.authService.getProfile(req.user);
  // }
}
