import { EicCrudListOperation } from "./crudlist-operation";
import { EicCrudListContainer } from "./crudlist-container";

import { Component } from "@angular/core";


/**
 * Adding the add button to page content. Is necessary that this out of the
 * ion-content tag
 * Is mandatory that the main page inherit of {@link EicCrudListController}.
 */
@Component({
  selector: "eic-crudlist-addbutton",
  template: `
        <ion-fab right bottom>
          <button ion-fab style='z-index: 999' (click)="navAddItem()">
            <ion-icon name='add'></ion-icon>
          </button>
        </ion-fab>
       `
})
export class EicCrudListAddButtonComponent {

  private listController: EicCrudListOperation;

  constructor(parent: EicCrudListContainer) {
    this.listController = parent.parent;
  }

  navAddItem() {
    this.listController.navAddItem();
  }
}
