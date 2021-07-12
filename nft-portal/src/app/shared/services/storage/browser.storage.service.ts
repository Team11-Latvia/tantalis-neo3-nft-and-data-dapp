import { Injectable } from '@angular/core';
import { StorageServiceInterface } from "./storage.service.interface";

@Injectable({ providedIn: 'root' })
export class BrowserStorageService implements StorageServiceInterface {
    getValueByKey<T>(key: string): T | undefined {
        throw new Error("Method not implemented.");
    }

    storeValueByKey<T>(key: string, value: T): T {
        throw new Error("Method not implemented.");
    }

    removeValueByKey<T>(key: string): void {
        throw new Error("Method not implemented.");
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }
}