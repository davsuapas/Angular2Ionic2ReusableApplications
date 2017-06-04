import { EIC_TEST_CORE_PROVIDERS } from "./provider.test";

import {IonicModule} from 'ionic-angular';
import { TestBed } from "@angular/core/testing";
import { LOG_LOGGER_PROVIDERS } from "angular2-logger";

// In future, the library will be export an other project,
// beacause I have two classes for Test utils. In this way,
// copying the library folder and this class, i can generate 
// easly the library in other project 
export class LibraryTestUtils {

  public static beforeEachCompiler(components: Array<any>, providers: Array<any> = [], imports: Array<any> = []): Promise<{fixture: any, instance: any, testBed: typeof TestBed}> {
    return LibraryTestUtils.configureIonicTestingModule(providers, components, imports)
      .compileComponents().then(() => {
        const fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
    });
  }

  public static configureIonicTestingModule(providers: Array<any>, components: Array<any> = [], imports: Array<any> = []): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [...components],
      providers: [
        ...LOG_LOGGER_PROVIDERS,
        ...EIC_TEST_CORE_PROVIDERS,
        ...providers
      ],
      imports: [
        IonicModule,
        ...imports
      ]
    });
  }
}
