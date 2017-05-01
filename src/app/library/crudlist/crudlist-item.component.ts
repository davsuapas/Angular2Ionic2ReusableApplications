import {EicCrudListContainer} from './crudlist-container';
import {EicCrudListOperation} from './crudlist-operation';

import {Input, Component} from "@angular/core";
import {List} from "ionic-angular";

/**
 * Allow navigate to the edit page from a item of the list.
 * Is mandatory that the main page inherit of {@link EicCrudListController}.
 * Also is mandatory configures the options of the {@link EicCrudListController} class in the main page,
 * Look at {@link EicCrudListOperation} interface
 * Properties:
 *  - edit: Entity for edit
 *  - icon-new-item: Icon that display when insert new item
 */

@Component({
    selector: "eic-crudlist-item",
    template: `
        <ion-item-sliding>
            <ion-item>
                <ion-icon [hidden]="!edit.__isNew" [name]="getIconNameNewItem()" item-left></ion-icon>
                <ng-content></ng-content>
            </ion-item>
            <ion-item-options side="right">
              <button ion-button (click)="navEditItem()"><ion-icon name="archive"></ion-icon></button>
            </ion-item-options>
        </ion-item-sliding>
       `
})
export class EicCrudListItemComponent {

    private listController: EicCrudListOperation;

    constructor(private list: List, containerListController: EicCrudListContainer) {
        this.listController = containerListController.parent;
    }

    @Input() edit: any;
    @Input("icon-new-item") iconNewItem: string;

    getIconNameNewItem(): string {
        return this.iconNewItem ? this.iconNewItem : "add";
    }

    /**
     * Allow to navigate edition page;
     */
    navEditItem() {
        this.list.closeSlidingItems();
        this.listController.navEditItem(this.edit);
    }
}
