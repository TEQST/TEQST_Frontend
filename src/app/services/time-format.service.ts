import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFormatService {

  public getTimeString(num): string {
    if (typeof num === 'undefined') return '00:00:00';

    const h = this.makeDoubleDigit(Math.floor(num / 3600));
    const m = this.makeDoubleDigit(Math.floor(num % 3600 / 60));
    const s = this.makeDoubleDigit(Math.floor(num % 3600 % 60));

    return `${h}:${m}:${s}`;
  }

  makeDoubleDigit(num): string {
    return num >= 10 ? num : '0' + num;
  }
}
