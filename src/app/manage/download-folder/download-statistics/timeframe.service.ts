import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeframeService {

  private month: string;
  private start: string;
  private startActive: boolean;
  private end: string;
  private endActive: boolean;
  private mode: "basic" | "advanced";

  constructor() {
    this.resetValues()
  }

  public getMonth(): string {
    return this.month;
  }
  public setMonth(value: string) {
    this.month = value;
  }

  public getStart(): string {
    return this.start;
  }
  public setStart(value: string) {
    this.start = value;
  }

  public isStartActive() {
    return this.startActive;
  }
  public setStartActive(value: boolean) {
    this.startActive = value;
  }

  public isEndActive() {
    return this.endActive;
  }
  public setEndActive(value: boolean) {
    this.endActive = value;
  }

  public getEnd(): string {
    return this.end;
  }
  public setEnd(value: string) {
    this.end = value;
  }

  getMode(): string {
    return this.mode
  }

  setBasic() {
    this.mode = "basic"
  }

  setAdvanced() {
    this.mode = "advanced"
  }

  getParams(): object {
    if (this.mode === "basic") {
      //Grab month and year from timestamp
      const splitted = this.month.split('-', 2)
      return {
        "month": splitted[1],
        "year": splitted[0]
      }
    }
    if (this.mode === "advanced") {
      // Grab date from timestamps
      return {
        "start": this.startActive ? this.start.split('T')[0] : "2000-01-01",
        "end": this.endActive ? this.end.split('T')[0] : "2999-12-31",
      }
    }
  }

  resetValues() {
    this.month = new Date().toISOString()
    this.start = new Date().toISOString()
    this.startActive = true;
    this.end = new Date().toISOString()
    this.endActive = true;
    this.mode = "basic"
  }

}
