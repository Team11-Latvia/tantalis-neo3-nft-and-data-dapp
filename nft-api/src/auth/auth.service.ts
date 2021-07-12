import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { AuthInfoDto } from "./dto/auth.info.dto";
import { AuthTokenDto } from "./dto/auth.token.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository
    ) {
    }

    async authenticate(authInfo: AuthInfoDto): Promise<AuthTokenDto> {
        // TODO: Verify signature by public key provided
        return { token: authInfo.signature };
    }

    async getMe(token: AuthTokenDto): Promise<AuthInfoDto> {
        return undefined;
    }

    async logout(token: AuthTokenDto): Promise<AuthTokenDto> {
        return undefined;
    }

    async validate(token: AuthTokenDto): Promise<boolean> {
        return true;
    }

    async validateUser(tokenDto: AuthTokenDto): Promise<AuthInfoDto> {
        // TODO: Verify user by signature provided
        const userInfo: AuthInfoDto = {
            publicKey: '',
            address: '',
            email: '',
            signature: tokenDto.token
        };
        return userInfo;
    }
}
