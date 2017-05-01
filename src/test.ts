import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {OFF_LOGGER_PROVIDERS} from "angular2-logger/core";
import {getTestBed, TestBed} from '@angular/core/testing';
import { IonicModule } from "ionic-angular";
import { EIC_TEST_CORE_PROVIDERS } from "./app/library/test/index";

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): void {
  // noop
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>, providers: Array<any> = []): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(providers, components)
      .compileComponents().then(() => {
        const fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(providers: Array<any>, components: Array<any> = []): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [...components],
      providers: [
        OFF_LOGGER_PROVIDERS,
        EIC_TEST_CORE_PROVIDERS,
        ...providers,
      ],
      imports: [
        IonicModule,
      ]
    });
  }
}
