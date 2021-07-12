import { Injectable } from '@angular/core';
import { StorageServiceInterface } from "./storage.service.interface";

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements StorageServiceInterface {
    private readonly storage = window.localStorage;

    getValueByKey<T>(key: string): T | undefined {
        const strRepr = this.storage.getItem(key);
        if (!strRepr) {
            return undefined;
        }
        const parsed = JSON.parse(strRepr) as T;
        return parsed;
    }

    storeValueByKey<T>(key: string, value: T): T {
        const strRepr = JSON.stringify(value);
        this.storage.setItem(key, strRepr);
        return value;
    }

    removeValueByKey<T>(key: string): void {
        this.storage.removeItem(key);
    }

    clear(): void {
        this.storage.clear();
    }
}