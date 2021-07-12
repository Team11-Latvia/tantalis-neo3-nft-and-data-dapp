export interface StorageServiceInterface {
    getValueByKey<T>(key: string): T | undefined;
    storeValueByKey<T>(key: string, value: T): T;
    removeValueByKey<T>(key: string): void;
    clear(): void;
}