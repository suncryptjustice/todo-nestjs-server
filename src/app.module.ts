import { Module } from '@nestjs/common/decorators';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core/router';
import routerConfig from './config/router.config';
import configuration from './config/base.config';
import dbConfiguration from './config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration, dbConfiguration],
    }),
    RouterModule.register(routerConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('db'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
