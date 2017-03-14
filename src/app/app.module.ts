import {MyApp} from './app.component';
import {CoreModule} from "./core/core.module";
import {ErrorLoadPage} from "./main/error-load.component";
import {AppLoadPage} from "./main/app-load.component";
import {WorkspacePage} from "./main/workspace.component";

import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Options, Level, Logger} from "angular2-logger/core";

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
    [ { provide: Options, useValue: { level: Level.DEBUG } }, Logger ],
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
