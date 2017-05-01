import {ContextStorageService} from './core/contexts/context-storage.abstract.service';
import {AccessControlService} from './core/login/access-control.abstract.service';
import {AquariumManagementListPage} from './aquarium-management/aquarium-list.component';
import {AppLoadPage} from "./main/app-load.component";
import {WorkspacePage} from "./main/workspace.component";
import {ErrorLoadPage} from "./main/error-load.component";

import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AppLoadPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private accessControl: AccessControlService,
    private contextStorage: ContextStorageService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Init and checking storage permission
      this.contextStorage.init().then(
        () => {
          this.accessControl.CheckIn().then(
            () => this.nav.setRoot(WorkspacePage),
            (error) => this.nav.setRoot(ErrorLoadPage, error)
          );
        },
        () => this.nav.setRoot(ErrorLoadPage,
          "Por la seguridad de sus datos, esta aplicación no funciona si no tiene configurado el sistema de bloqueo de pantalla de su dispositivo")
      );
    });

    this.pages = [
      {title: "Lista de aquarios", component: AquariumManagementListPage}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
