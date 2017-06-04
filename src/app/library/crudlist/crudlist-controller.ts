import {EicObjectUtil} from "../util/object-util";
import {EicCrudListEditionOperation} from "./crudlist-edition-operation";
import {EicCrudListOptions} from "./crudlist-options";
import {EicCrudListData} from "./crudlist-data";
import {EicCrudListContainer} from "./crudlist-container";
import {EicEnumEditionType} from "../form-edition/edition-type";
import {EicCrudListOperation} from "./crudlist-operation";

import {OnInit, ViewChild} from "@angular/core";
import {Content} from "ionic-angular";

const CONST_METADATA_KEY_NAME = Symbol("EicCrudListData:KeyName");

/**
 * Decorator define the key name. EicCrudListController use key name to know
 * what's property to access a item of the list
 * @param {string} name of the key
 * @returns {function(any): undefined}  
 * @constructor
 */
export function EicKeyName(name: string): ClassDecorator {
  return target => Reflect.defineMetadata(CONST_METADATA_KEY_NAME, name, target);
}

/**
 * Implements the operations for list mode in ionic. Controller to
 * select item, add and edit navigation and delete operation.
 * The class needs in the constructor: {@link EicCrudListContainer}, {@link EicCrudListOptions},
 * {@link EicCrudListData}
 * Is mandatory define as provider EicCrudListContainer in the base component
 * Is mandatory define @EicKeyName(name: string) in the class what inherit of EicCrudListData
 * Properties of the class to use in html:
 *  - any[] items: Represent a collection of items to display a ionic list
 */
export abstract class EicCrudListController implements OnInit, EicCrudListOperation, EicCrudListEditionOperation {

    items: any[];

    constructor(private container: EicCrudListContainer, private options: EicCrudListOptions, private crudData: EicCrudListData) {
        container.parent = this;
    }

    @ViewChild(Content) content;

    /**
     * Read the items getting for service that implements EicCrudListData
     */
    ngOnInit() {
        this.crudData.getAll().subscribe(
            items => this.items = items
        );
    }

    /**
     * Allow to navigate edition page. Is mandatory configure the navEditPage property
     * in the main page.
     * Is used by {@link EicCrudListItem}
     * @param {any} item from list to edit
     */
    navEditItem(item: any) {

        this.checkEditionNavPage();

        const id: any = item[this.getEntityKeyName()];

        this.container.navController.push(
            this.options.navEditPage,
            {
                editionType: EicEnumEditionType.update,
                id: id
            });
    }

    /**
     * Check the navEditPage property is defined.
     * @param {any} id to edit
     */
    private checkEditionNavPage() {

        if (!this.options.navEditPage) {
            throw new Error("EicCrudListController: navEditPage is not defined");
        }
    }

    /**
     * Allow to navigate add page. Is mandatory configure the navAddPage property
     * in the main page.
     * Is used by {@link EicCrudListAddButton}
     */
    navAddItem() {
        this.checkAddNavPage();

        this.container.navController.push(this.options.navAddPage,
           { editionType: EicEnumEditionType.add });
    }

    /**
     * Check the navAddPage property in the the main page.
     */

    private checkAddNavPage() {

        if (!this.options.navAddPage) {
            throw new Error("EicCrudListController: navAddPage is not defined");
        }
    }

    /**
     * Add item at the bottom list and is marked as new.
     * Is called from the form edition
     * @param {any} item to add
     */
    addItem(item: any) {
        item.__isNew = true;
        this.items.unshift(item);
        this.content.scrollToTop();
    }

    /**
     * Updating item of the list. The key name will have got by {@link EicCrudListData}
     * Is called from the form edition
     * @param {any} item to update
     */
    updateItem(item: any) {

        const itemUpdate: any = this.findItem(item[this.getEntityKeyName()]);

        if (itemUpdate) {

            EicObjectUtil.forEachProperties(itemUpdate, function(propertyName) {

               if (item[propertyName]) {
                   itemUpdate[propertyName] = item[propertyName];
               }
            });
        }
    }

    private findItem(id: any) {
        const that = this;
        return this.items.find(function(itemList) {
           return itemList[that.getEntityKeyName()] === id;
        });
    }

    private getEntityKeyName(): string {
        const keyName: string = Reflect.getMetadata(CONST_METADATA_KEY_NAME, this.crudData.constructor);

        if (!keyName) {
            throw new Error("EicCrudListController: Is mandatory decorate EicCrudListController with @EicKeyName(name: string)");
        }

        return keyName;
    };
}
