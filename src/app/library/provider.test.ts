import { EicConfigMock, EicPlatformMock, EicDeepLinkerMock } from "./mock";

import {Provider} from "@angular/core";
import { MenuController, Config, Platform, Keyboard, App, GestureController, DomController, DeepLinker } from 'ionic-angular';

export const EIC_TEST_CORE_PROVIDERS: Array<Provider> = [
    App, Keyboard, DomController, GestureController, MenuController,
    {provide: DeepLinker, useClass: EicDeepLinkerMock},
    {provide: Config, useClass: EicConfigMock},
    {provide: Platform, useValue: EicPlatformMock}
];
