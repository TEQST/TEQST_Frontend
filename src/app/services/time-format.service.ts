import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeFormatService {

  constructor() { }

  public getTimeString(num) {
    if (typeof num === 'undefined') return '00:00:00'
    
    var h = this.makeDoubleDigit(Math.floor(num / 3600))
    var m = this.makeDoubleDigit(Math.floor(num % 3600 / 60))
    var s = this.makeDoubleDigit(Math.floor(num % 3600 % 60))

    return `${h}:${m}:${s}`
  }

  makeDoubleDigit(num) {
    return num >= 10 ? num : "0" + num
  }
}
