import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeframeService {

  private month: string;
  private start: string;
  private end: string;
  private mode: "basic" | "advanced";

  constructor() {
    this.resetValues()
  }

  public getMonth(): string {
    return this.month;
  }
  public setMonth(value: string) {
    console.log(`Month set to: ${value}`)
    this.month = value;
  }

  public getStart(): string {
    return this.start;
  }
  public setStart(value: string) {
    this.start = value;
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
    console.log("Set to Basic")
    this.mode = "basic"
  }

  setAdvanced() {
    console.log("Set to Advanced")
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
        "start": this.start.split('T')[0],
        "end": this.end.split('T')[0]
      }
    }
  }

  resetValues() {
    this.month = new Date().toISOString()
    this.start = new Date().toISOString()
    this.end = new Date().toISOString()
    this.mode = "basic"
  }

}
