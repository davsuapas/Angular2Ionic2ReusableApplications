import {AccessControlTestMock} from './login/access-control.service.test.mock';
import {ContextStorage} from './contexts/context-storage.service';
import {ContextStorageTestMock} from './contexts/context-storage.service.test.mock';
import {AccessControl} from "./login/access-control.service";
import {LoginService} from "./login/login.service";
import {ContextService} from "./contexts/context.service";
import { ContextStorageService } from "./contexts/context-storage.abstract.service";
import { AccessControlService } from "./login/access-control.abstract.service";
import { config, APP_CONFIG } from "../config";

import {SecureStorage} from '@ionic-native/secure-storage';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {NgModule} from '@angular/core';
import { Logger } from "angular2-logger/core";
import { EicOauth2AuthorizeService } from "../library/index";

export function eicOauth2AuthorizeServiceFactory(logger: Logger, appBrowser: InAppBrowser) {
  return new EicOauth2AuthorizeService(config.oAuth2Config, logger, appBrowser);
};

export function contextStorageServiceFactory(config: any, logger: Logger, secure: SecureStorage): ContextStorageService {
  if (config.debugBrowser) {
      return  new ContextStorageTestMock();
  }
  else {
      return new ContextStorage(logger, secure);
  }  
}

export function accessControlServiceFactory(config: any, contextStorage: ContextStorageService, login: LoginService, contextService: ContextService, logger: Logger): AccessControlService {
  if (config.debugBrowser) {
      return  new AccessControlTestMock();
  }
  else {
      return new AccessControl(contextStorage, login, contextService, logger);
  }  
}

@NgModule({
  providers: [
    ContextService,
    LoginService,
    SecureStorage,
    InAppBrowser,
    {provide: APP_CONFIG, useValue: config},
    {provide: ContextStorageService,
        useFactory: contextStorageServiceFactory,
        deps: [APP_CONFIG, Logger, SecureStorage]
    },
    {provide: AccessControlService,
        useFactory: accessControlServiceFactory,
        deps: [APP_CONFIG, ContextStorageService, LoginService, ContextService, Logger]
    },
    {provide: EicOauth2AuthorizeService,
        useFactory: eicOauth2AuthorizeServiceFactory,
        deps: [Logger, InAppBrowser]
    }
  ]
})
export class CoreModule { }
