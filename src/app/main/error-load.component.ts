import {Component} from '@angular/core';
import {NavParams, Platform} from "ionic-angular";

/**
 * Error loading application message
 */
@Component({
  selector: 'error-load-page',
  templateUrl: 'error-load.page.html'
})
export class ErrorLoadPage {

  error: string;

  constructor(navParams: NavParams, private platform: Platform) {
      this.error = navParams.data;
  }

  exit() {
    this.platform.exitApp();
  }
}
