import { Module } from '@nestjs/common';
import { BuyService } from './byu.service';
import { BuyController } from './buy.controller';


@Module({
    imports: [
    ],
    controllers: [
        BuyController,
    ],
    providers: [
        BuyService,
    ],
    exports: [
    ]
})
export class BuyModule {
}
