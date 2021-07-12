import { NgModule } from "@angular/core";
import { FileUploadService } from "./services/file.upload.service";
import { LocalFileUploadService } from "./services/local.file.upload.service";

@NgModule({
    imports: [
    ],
    providers: [
        {
            provide: FileUploadService,
            /* Or ApiFileUploadService to connect to the Backend */
            useClass: LocalFileUploadService
        },
    ],
    exports: [
    ]
})
export class FileUploadModule { }