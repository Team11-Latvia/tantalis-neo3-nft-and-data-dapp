import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { PubKeyAuthGuard } from './pubkey.auth.guard';
import { PassportModule } from '@nestjs/passport';
import { PubKeyAuthStrategy } from './pubkey.auth.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository]),
        PassportModule.register({ defaultStrategy: 'public-key' })
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        PubKeyAuthStrategy,
        PubKeyAuthGuard,
    ],
    exports: [
        AuthService,
        PubKeyAuthGuard
    ]
})
export class AuthModule {
}
