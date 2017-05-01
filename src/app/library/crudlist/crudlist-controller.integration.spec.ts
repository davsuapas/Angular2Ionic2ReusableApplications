import {EicNavControllerMock} from '../mock';
import {EicCrudListController} from "./crudlist-controller";
import {EicCrudListAddButtonComponent} from "./crudlist-addbutton.component";
import { EicCrudListContainer } from "./crudlist-container";
import { LibraryTestUtils } from "../test";

import {Component} from "@angular/core";
import { async } from '@angular/core/testing';
import { NavController } from "ionic-angular";

describe('EicCrudListController.Integration', () => {

  @Component({
    template: `
          <ion-list>
              <eic-crudlist-addbutton></eic-crudlist-addbutton>
          </ion-list>`,
    viewProviders: [EicCrudListContainer]
  })
  class CrudListControllerPage extends EicCrudListController {
      constructor(container: EicCrudListContainer) {
          super(container, undefined, undefined);
      }
  }

  beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
    [CrudListControllerPage, EicCrudListAddButtonComponent],
    [{provide: NavController, useValue: EicNavControllerMock}]).then(compiled => {
    }))
  );

  it('Checking inside crudlist-addbutton is injected EicCrudListContainer', () => {
      // If not exist provider should get error. Is not neccesary ckeck nothing
  });
});
