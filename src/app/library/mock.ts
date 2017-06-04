import {NavController} from "ionic-angular";
import { Platform, NavParams } from "ionic-angular";

export let EicPlatformMock: Platform = jasmine.createSpyObj("Platform", ["exitApp", "registerBackButtonAction", "doc", "registerListener", "win", "raf", "timeout", "cancelTimeout", "getActiveElement", "hasFocus"]);
export let EicClassMock: any = jasmine.createSpyObj("GeneralMock", ["dummy"]);
export let EicNavControllerMock: NavController = jasmine.createSpyObj("NavController", ["getPrevious", "getActive", "pop", "push"]);
export let EicNavParamsMock: NavParams = jasmine.createSpyObj("NavParams", ["get"]);

export class EicDeepLinkerMock {
}

export class EicConfigMock {
  public get(): any {
    return '';
  }
  public getBoolean(): boolean {
    return true;
  }
  public getNumber(): number {
    return 1;
  }
  public setTransition(): void {
    return;
  }
}
