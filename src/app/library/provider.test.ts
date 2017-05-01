import {EicConfigMock, EicPlatformMock} from "./mock";

import {Provider} from "@angular/core";
import {MenuController, Config,  Platform,  Keyboard,  App,  GestureController,  DomController} from 'ionic-angular';

export const EIC_TEST_CORE_PROVIDERS: Array<Provider> = [
    App, Keyboard, DomController, GestureController, MenuController,
    {provide: Config, useClass: EicConfigMock},
    {provide: Platform, useValue: EicPlatformMock}
];
