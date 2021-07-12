import { Injectable } from '@nestjs/common';
import { ServiceStatusDto } from './dto/service.status.dto';

@Injectable()
export class ServiceStatusService {
    async getServiceStatus(): Promise<ServiceStatusDto> {
        const status = new ServiceStatusDto(true);
        return status;
    }
}