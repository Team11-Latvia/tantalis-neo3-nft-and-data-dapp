import { LocalFileUploadService } from './file-upload/services/local.file.upload.service';
import { FileUploadService } from './file-upload/services/file.upload.service';
import { ApiPrefixInterceptor } from './../interceptors/api.prefix.interceptor';
import { UserAuthInterceptor } from './../interceptors/user.auth.interceptor';
import { UserInfoService } from './user/user.info.service';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FileUploadModule } from "./file-upload/file.upload.module";
import { NftApiService } from "./nft/nft.api.service";
import { BrowserStorageService } from "./storage/browser.storage.service";
import { SessionStorageService } from "./storage/session.storage.service";
import { UserAuthService } from "./user/user.auth.service";
import { UserService } from "./user/user.service";
import { WalletPluginService } from "./wallet/wallet.plugin.service";
import { NewsSubscriptionApiService } from './news-subscription/news.subscription.api.service';

@NgModule({
    imports: [
        FileUploadModule,
    ],
    declarations: [
    ],
    providers: [
        WalletPluginService,
        UserService,
        NftApiService,
        NewsSubscriptionApiService,
        {
            provide: BrowserStorageService,
            useClass: SessionStorageService
        },
        {
            provide: FileUploadService,
            useClass: LocalFileUploadService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UserAuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiPrefixInterceptor,
            multi: true
        },
        UserInfoService,
        UserAuthService
    ],
    exports: [
        FileUploadModule
    ]
})
export class SharedServicesModule {}