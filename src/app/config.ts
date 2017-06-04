
import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<any>('app.config');

export const config = {
  oAuth2Config: {
    authorizeUrl: "http://sushi.com:8080/oauth/authorize",
    params: {
      clientId: "mobile"
    }
  },
  debugNoServer: true
};
