import {AquariumManagementEditionPage} from './aquarium-edition.component';
import {AquariumDataTestMock} from './aquarium-data.test.mock';
import { AquariumManagementListPage } from "./aquarium-list.component";
import { AquariumManagementDataProvider } from "./aquarium-management-data-provider";
import { APP_CONFIG } from "../config";

import {IonicModule} from 'ionic-angular';
import { NgModule } from "@angular/core";
import { EicCrudListModule, EicFormEditionModule, EicFormValidationModule } from "../library/index";

export function eicCrudListDataFactory(config: any): any {
  if (config.debugNoServer) {
      return new AquariumDataTestMock();
  }
  else {
      return new AquariumDataTestMock();
  }  
}

@NgModule({
    declarations: [
        AquariumManagementListPage,
        AquariumManagementEditionPage
    ],
    imports: [
        EicCrudListModule,
        EicFormEditionModule,
        EicFormValidationModule,
        IonicModule
    ],
    providers: [
        {provide: AquariumManagementDataProvider,
            useFactory: eicCrudListDataFactory,
            deps: [APP_CONFIG]            
        }
    ]
})
export class AquariumManagementModule { }