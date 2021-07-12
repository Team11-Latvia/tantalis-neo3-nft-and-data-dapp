import { Body, Controller, Get, HttpCode, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get('/:address')
    @ApiOperation({ summary: 'Get user by his wallet address' })
    @ApiResponse({ status: 200, description: 'A user by his wallet address', type: UserDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getUserByAddress(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<UserDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address}`);
        return this.userService.getUserByAddress(address);
    }

    @Post('/:address')
    @HttpCode(200)
    @ApiOperation({ summary: 'Update user by his wallet address and given DTO' })
    @ApiResponse({ status: 200, description: 'An updated user by his wallet address and given DTO', type: UserDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async updateUserByAddress(
        @Req() req: Request,
        @Param('address') address: string,
        @Body() dto: UserDto
    ): Promise<UserDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${JSON.stringify(dto)}`);
        return this.userService.updateUserByAddress(address, dto);
    }
}
