import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Access route params outside of routed component
// Code based on: https://medium.com/@tomastrajan/how-to-get-route-path-parameters-in-non-routed-angular-components-32fc90d9cb52
export class RouteStateService {

  private speakerParamState = new BehaviorSubject<string>(null);

  public speakerParam: Observable<string>;

  constructor() {
    this.speakerParam = this.speakerParamState.asObservable();
  }

  updateSpeakerParamState(newSpeakerParam: string): void {
    this.speakerParamState.next(newSpeakerParam);
  }
}
