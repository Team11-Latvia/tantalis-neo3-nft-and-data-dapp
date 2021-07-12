import { ApiProperty } from '@nestjs/swagger';

export class ServiceStatusDto {
    @ApiProperty()
    public readonly status: boolean;

    constructor(status: boolean) {
        this.status = status;
    }
}