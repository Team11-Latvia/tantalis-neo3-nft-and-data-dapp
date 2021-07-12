export class DateUtils {
    static toUTC(localDate: Date): Date {
        const utcTimestamp = Date.UTC(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            localDate.getHours(),
            localDate.getMinutes(),
            localDate.getSeconds(),
            localDate.getMilliseconds(),
        );
        return new Date(utcTimestamp);
    }
      
    static fromUTC(utcDate: Date): Date {
        return new Date(
          utcDate.getUTCFullYear(),
          utcDate.getUTCMonth(),
          utcDate.getUTCDate(),
          utcDate.getUTCHours(),
          utcDate.getUTCMinutes(),
          utcDate.getUTCSeconds(),
          utcDate.getUTCMilliseconds(),
        );
    }
}