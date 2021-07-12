import { Injectable } from "@nestjs/common";
import { OverallStatsDto } from "./dto/overall.stats.dto";

@Injectable()
export class StatsService {
    async getOverallStatistic(): Promise<OverallStatsDto> {
        const stats = new OverallStatsDto(15_000, 8_000, 2_000);
        return stats;
    }
}