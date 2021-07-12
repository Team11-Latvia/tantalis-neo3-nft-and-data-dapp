import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { SystemParamsController } from './system.params.controller';
import { SystemParamsRepository } from './system.params.repository';
import { SystemParamsService } from './system.params.service';
import { SystemService } from './system.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SystemParamsRepository])
    ],
    controllers: [
        SystemController,
        SystemParamsController
    ],
    providers: [
        SystemService,
        SystemParamsService
    ],
    exports: [
    ]
})
export class SystemModule {
}
