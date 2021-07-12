export enum FileUploadType {
    //
    // API
    //
    API_STATIC = 'API_STATIC',
    API_BASE64 = 'API_BASE64',

    //
    // Generic protocols
    //
    HTTP = 'HTTP',
    WEBDAV = 'WEBDAV',
    FTP = 'FTP',
    SFTP = 'SFTP',
    SCP = 'SCP',

    //
    // Cloud protocols
    //
    AMAZON_S3 = 'AMAZON_S3',
    AMAZON_EBS = 'AMAZON_EBS',
    AMAZON_EFS = 'AMAZON_EFS',
    GOOGLE_CLOUD_STORAGE = 'GOOGLE_CLOUD_STORAGE',
    MICROSOFT_AZURE_STORAGE = 'MICROSOFT_AZURE_STORAGE',
    DO_OBJECT_STORAGE = 'DO_OBJECT_STORAGE',
    DO_BLOCK_STORAGE = 'DO_BLOCK_STORAGE',
    SCALEWAY_OBJECT_STORAGE = 'SCALEWAY_OBJECT_STORAGE',

    //
    // Blockchains
    //
    IPFS = 'IPFS',
    CHIA = 'CHIA',
    FILECOIN = 'FILECOIN',
    NEO_BLOB = 'NEO_BLOB',
    NEO_DFS = 'NEO_DFS',
    NXA_BLOB = 'NXA_BLOB',
    NXA_DFS = 'NXA_DFS',
}
