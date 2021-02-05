import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      const seconds = Math.floor(
        (new Date().getTime() - new Date(value).getTime()) / 1000
      );
      // getTime() - milliseconds* since the Unix Epoch.
      if (seconds < 29) return 'Just now';
      const intervals = {
        year: 31536000, // 31536000 sec in a year
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        // i=week; intervals[i]=604800
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (eg. 1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (eg. 2 days ago)
          }
      }
    }
    return value;
  }
}
