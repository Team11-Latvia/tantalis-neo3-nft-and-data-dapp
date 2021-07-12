export class CloneUtils {
    static clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
}