import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthTokenDto } from './dto/auth.token.dto';

@Injectable()
export class PubKeyAuthStrategy extends PassportStrategy(Strategy, 'public-key') {
    private readonly logger = new Logger(PubKeyAuthStrategy.name);

    constructor(
        private readonly authService: AuthService
    ) {
        super();
        this.logger.debug(`Creating Strategy...`);
    }

    async validate(request: Request): Promise<any> {
        this.logger.debug(`Validating: ${request.headers.authorization}`);
        const authToken: AuthTokenDto = { token: request.headers.authorization };
        const userInfo = await this.authService.validateUser(authToken);
        if (!userInfo) {
          throw new UnauthorizedException();
        }
        return userInfo;
    }
}
