import { Body, Controller, Get, HttpCode, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthInfoDto } from './dto/auth.info.dto';
import { AuthTokenDto } from './dto/auth.token.dto';
import { PubKeyAuthGuard } from './pubkey.auth.guard';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(PubKeyAuthGuard)
    @Get('/me')
    @ApiOperation({ summary: 'Get current user by its token' })
    @ApiResponse({ status: 200, description: 'Auth info', type: AuthInfoDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getMe(
        @Req() req: Request,
    ): Promise<AuthInfoDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        // TODO: extract token
        const token = new AuthTokenDto('');
        const user = req.user;
        console.dir(user);
        return this.authService.getMe(token);
    }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login user with its public key and signed payload (by wallet)' })
    @ApiBody({ type: AuthInfoDto })
    @ApiResponse({ status: 200, description: 'Token Info', type: AuthTokenDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async loginUser(
        @Req() req: Request,
        @Body() dto: AuthInfoDto
    ): Promise<AuthTokenDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(dto)}`);
        return this.authService.authenticate(dto);
    }

    @UseGuards(PubKeyAuthGuard)
    @Post('/logout')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login user with its public key and signed payload (by wallet)' })
    @ApiBody({ type: AuthInfoDto })
    @ApiResponse({ status: 200, description: 'Token Info', type: AuthTokenDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async logoutUser(
        @Req() req: Request,
        @Body() dto: AuthTokenDto
    ): Promise<AuthTokenDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.authService.logout(dto);
    }
}