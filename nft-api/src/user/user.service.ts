import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly userRepository: UserRepository
    ) {
    }

    async getUserByAddress(address: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ address });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return UserDto.from(user);
    }

    async updateUserByAddress(address: string, dto: UserDto): Promise<UserDto> {
        if (address != dto.address) {
            throw new BadRequestException('User address mismatch');
        }

        let user = await this.userRepository.findOne({ address });

        if (!user) {
            this.logger.debug(`Creating new user for: ${JSON.stringify(dto)}`)
            // Do not pass existent dto to not to deep-copy sensitive fields,
            // but merge fields to update manually instead.
            user = this.userRepository.create();
        } else {
            this.logger.debug(`Updating existing user for: ${JSON.stringify(user)}`)
        }

        // Update profile fields only
        user.name = dto.name;
        
        const saved = await this.userRepository.save(user);
        
        this.logger.debug(`User info for ${address} updated to : ${JSON.stringify(saved)}`);

        return UserDto.from(saved);
    }
}