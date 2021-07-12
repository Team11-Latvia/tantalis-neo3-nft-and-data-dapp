import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class PubKeyAuthGuard extends AuthGuard('public-key')  {
    private readonly logger = new Logger(PubKeyAuthGuard.name);

    constructor(
        private readonly authService: AuthService
    ) {
        super();
        this.logger.debug(`Creating Guard...`);
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const request = context.switchToHttp().getRequest();
                const token = request.headers?.authorization;
                const activate = await this.authService.validate({ token });

                this.logger.debug(`Can Activate with: ${token} -> ${activate}`);
    
                if (!activate) {
                    resolve(false);
                }
    
                await (super.canActivate(context) as Promise<boolean>);
                resolve(true);
            } catch(e) {
                this.logger.error(e);
                reject(e);
            }
        });
    }
}