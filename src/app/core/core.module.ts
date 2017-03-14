import {AccessControl} from "./login/access-control.service";
import {LoginService} from "./login/login.service";
import {ContextService} from "./contexts/context.service";
import {ContextStorage} from "./contexts/context-storage.service";
import {config} from "../config";

import {NgModule} from '@angular/core';
import {Logger} from "angular2-logger/core";
import {EicOauth2AuthorizeService} from "elipcero-ionic-core";

export function eicOauth2AuthorizeServiceFactory(logger: Logger) {
  return new EicOauth2AuthorizeService(config.oAuth2Config, logger);
};

@NgModule({
  providers: [
    { provide: EicOauth2AuthorizeService,
        useFactory: eicOauth2AuthorizeServiceFactory,
        deps: [Logger]
    },
    ContextStorage,
    ContextService,
    LoginService,
    AccessControl,
  ]
})
export class CoreModule { }
