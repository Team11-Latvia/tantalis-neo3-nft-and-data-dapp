import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './file.upload.service';

@ApiTags('File Upload')
@Controller('/upload')
export class FileUploadController {
    private readonly logger = new Logger(FileUploadController.name);

    constructor(private readonly fileUploadService: FileUploadService) {
    }
}