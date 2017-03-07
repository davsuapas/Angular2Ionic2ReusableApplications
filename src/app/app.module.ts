import {MyApp} from './app.component';
import {CoreModule} from "./core/core.module";
import {ErrorLoadPage} from "./main/error-load.component";
import {AppLoadPage} from "./main/app-load.component";
import {WorkspacePage} from "./main/workspace.component";

import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {DEBUG_LOGGER_PROVIDERS} from "angular2-logger/core";

@NgModule({
  declarations: [
    MyApp,
    ErrorLoadPage,
    AppLoadPage,
    WorkspacePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ErrorLoadPage,
    AppLoadPage,
    WorkspacePage
  ],
  providers: [
    DEBUG_LOGGER_PROVIDERS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
