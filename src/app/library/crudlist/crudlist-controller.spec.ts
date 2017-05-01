import {EicCrudListData} from "./crudlist-data";
import {EicKeyName, EicCrudListController} from "./crudlist-controller";
import {EicEnumEditionType} from "../formedit/edition-controller";
import {EicClassMock} from "../mock";
import { EicCrudListContainer } from "./crudlist-container";
import {EIC_PROVIDER_TEST_CRUDLIST_CONTROLLER} from "./provider.test";
import { LibraryTestUtils } from "../test";

import {Injectable, Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {async, ComponentFixture} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('EicCrudListController', () => {

    const CONST_NAME = "name";
    const CONST_ID = "1";

    @Injectable()
    @EicKeyName("id")
    class DataServiceMock extends EicCrudListData {
        getAll() {
            return Observable.of<any[]>([
                {id: CONST_ID, name: CONST_NAME},
            ]);
        }
    }

    @Component({
        template: `
            <ion-list *ngFor="let item of items">
                <button (click)="navEditItem(item)"></button>
            </ion-list>`,
        providers: [{provide: EicCrudListData, useClass: DataServiceMock}],
        viewProviders: [EicCrudListContainer]
    })
    class CrudListControllerPage extends EicCrudListController {
        constructor(container: EicCrudListContainer, dataServiceMock: EicCrudListData) {
            super(
              container,
              {
                navAddPage: EicClassMock,
                navEditPage: EicClassMock,
              },
              dataServiceMock);
        }
    }

    let instance: CrudListControllerPage;
    let fixture: ComponentFixture<CrudListControllerPage>;

    beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
      [CrudListControllerPage],
      EIC_PROVIDER_TEST_CRUDLIST_CONTROLLER).then(compiled => {
        instance = compiled.instance;
        fixture = compiled.fixture;
        instance.content = jasmine.createSpyObj("Content", ["scrollToTop"]);
    })));

    afterEach(() => {
       fixture.destroy();
    });

    it('Container is assgined the component parent', () => {
        const container: EicCrudListContainer = instance["container"];
        expect(container.parent).toEqual(instance);
    });
    

    it('Initialize items list', () => {
        fixture.detectChanges();
        expect(instance.items[0].name).toBe(CONST_NAME);
    });

    it('Click button to navigate to the add page', () => {
        instance.navAddItem();

        expect(instance["container"].navController.push)
            .toHaveBeenCalledWith(EicClassMock, { editionType: EicEnumEditionType.add });
    });

    it('Click button to navigate to the add page and navAddPage option is not defined', () => {
        instance["options"].navAddPage = undefined;

        expect(() => instance.navAddItem()).toThrowError(Error);
    });

    it('Click button to navigate to the edition page', () => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('button')).triggerEventHandler("click", undefined);

        expect(instance["container"].navController.push)
            .toHaveBeenCalledWith(EicClassMock, { editionType: EicEnumEditionType.update, id: CONST_ID});
    });

    it('Click button to navigate to the edit page and navEditPage option is not defined', () => {
        instance["options"].navEditPage = undefined;

        expect(() => instance.navEditItem(undefined)).toThrowError(Error);
    });


    it('Is called from the edition form to update item at the list items', () => {
        const CONST_NAME_UPDATE = "name1";
        fixture.detectChanges();
        instance.updateItem({id: CONST_ID, name: CONST_NAME_UPDATE});

        expect(instance.items[0].name).toBe(CONST_NAME_UPDATE);
    });

    it('Is called from the edition form to add item at the items list and scroll to top', () => {
        const CONST_ID_ADD = "2";
        fixture.detectChanges();
        instance.addItem({id: CONST_ID_ADD, name: CONST_NAME});

        expect(instance.items[0]).toEqual({id: CONST_ID_ADD, name: CONST_NAME, __isNew: true});
        expect(instance.content.scrollToTop).toHaveBeenCalled();
    });

    it("Checking that UICrudListService doesn't contain the @KeyName decorator", () => {
        class DataServiceWithoutDecoratorMock extends EicCrudListData {
           getAll() { return undefined; }
        }
        instance["crudData"] = new DataServiceWithoutDecoratorMock();

        expect(() => instance["getEntityKeyName"]()).toThrowError(Error);
    });
});
