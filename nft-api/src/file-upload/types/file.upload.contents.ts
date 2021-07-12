export type FileUploadStringContents = string;
export type FileUploadBase64Contents = string;
export type FileUploadBufferContents = Buffer;
export type FileUploadBlobContents = Blob;

export type FileUploadContents =
    FileUploadStringContents |
    FileUploadBase64Contents |
    FileUploadBufferContents |
    FileUploadBlobContents;
