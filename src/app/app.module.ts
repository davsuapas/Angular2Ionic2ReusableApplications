import {MyApp} from './app.component';
import {CoreModule} from "./core/core.module";
import {ErrorLoadPage} from "./main/error-load.component";
import {AppLoadPage} from "./main/app-load.component";
import {WorkspacePage} from "./main/workspace.component";
import { AquariumManagementModule } from "./aquarium-management/aquarium.module";
import { AquariumManagementListPage } from "./aquarium-management/aquarium-list.component";

import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { Options, Level, Logger } from "angular2-logger/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyApp,
    ErrorLoadPage,
    AppLoadPage,
    WorkspacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CoreModule,
    AquariumManagementModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ErrorLoadPage,
    AppLoadPage,
    WorkspacePage,
    AquariumManagementListPage
  ],
  providers: [
    [ { provide: Options, useValue: { level: Level.DEBUG } }, Logger ],
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,    
  ]
})
export class AppModule {}
