import * as Rollbar from 'rollbar';


import {
  Injectable,
  Inject,
  InjectionToken,
  ErrorHandler,
} from '@angular/core';

const rollbarConfig = {
  accessToken: '64537dc9312241e085f9fed70fb182c3',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    person: {
      id: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
    },
  },
  autoInstrument: {
    network: true,
    networkRequestBody: true,
    networkResponseHeaders: true,
    log: true,
    dom: true,
    navigation: true,
    connectivity: true,
  },
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) { }

  handleError(err: any): void {
    this.rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}
