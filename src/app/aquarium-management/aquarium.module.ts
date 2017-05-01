import {AquariumDataTestMock} from './aquarium-data.test.mock';
import { AquariumManagementListPage } from "./aquarium-list.component";
import { APP_CONFIG } from "../config";

import { NgModule } from "@angular/core";
import { EicCrudListData, EicCrudListModule } from "../library/index";

export function eicCrudListDataFactory(config: any): EicCrudListData {
  if (config.debugBrowser) {
      return  new AquariumDataTestMock();
  }
  else {
      return new AquariumDataTestMock();
  }  
}

@NgModule({
    declarations: [
        AquariumManagementListPage
    ],
    imports: [
        EicCrudListModule,
    ],
    providers: [
        {provide: EicCrudListData,
            useFactory: eicCrudListDataFactory,
            deps: [APP_CONFIG]            
        }
    ]
})
export class AquariumManagementModule { }