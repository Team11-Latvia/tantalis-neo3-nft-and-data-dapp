import { Module } from '@nestjs/common';
import { ServiceStatusController } from './service.status.controller';
import { ServiceStatusService } from './service.status.service';

@Module({
    imports: [
    ],
    controllers: [ServiceStatusController],
    providers: [ServiceStatusService],
    exports: [ServiceStatusService]
})
export class ServiceStatusModule {
}
