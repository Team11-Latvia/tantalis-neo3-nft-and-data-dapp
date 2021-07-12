import { Injectable } from "@nestjs/common";
import { SystemParamsDto } from "./dto/system.params.dto";
import { SystemParamsRepository } from "./system.params.repository";

@Injectable()
export class SystemParamsService {
    constructor(
        private readonly systemParamsRepository: SystemParamsRepository
    ) {
    }

    async getByKey(key: string): Promise<SystemParamsDto> {
        const param = await this.systemParamsRepository.findOneOrFail({ key });
        const dto = SystemParamsDto.from(param);
        return dto;
    }
}