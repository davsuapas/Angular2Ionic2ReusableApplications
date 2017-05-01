import { EicCrudListItemComponent } from "./crudlist-item.component";
import {EIC_PROVIDER_TEST_CRUDLIST_ITEM} from "./provider.test";
import { LibraryTestUtils } from "../test";

import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

describe('CrudListItem', () => {

    @Component({
        template: "<eic-crudlist-item [edit]='entity' icon-new-item='iconnewitem'></eic-crudlist-item>",
    })
    class CrudListItemHost {
        entity: any;

        @ViewChild(EicCrudListItemComponent) child: EicCrudListItemComponent;
    }

    let fixture: ComponentFixture<CrudListItemHost>;
    let instance: CrudListItemHost;

    beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
        [CrudListItemHost, EicCrudListItemComponent],
            EIC_PROVIDER_TEST_CRUDLIST_ITEM
        ).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    afterEach(() => {
         fixture.destroy();
    });

    it('Is showed icon when it is created a new register', () => {
        instance.entity = { __isNew: true};
        fixture.detectChanges();
        expect(GetIonNewItem(fixture).getAttribute("hidden")).toBeNull();
    });

    it('Is not showed icon when it is updated a register', () => {
        instance.entity = { __isNew: false};
        fixture.detectChanges();
        expect(GetIonNewItem(fixture).getAttribute("hidden")).not.toBeNull();
    });

    it('Does click to edit item', () => {
        instance.entity = { __isNew: false};
        fixture.detectChanges();
        fixture.debugElement.query(By.css('button')).triggerEventHandler("click", undefined);
        expect(instance.child["list"].closeSlidingItems).toHaveBeenCalled();
    });

    function GetIonNewItem(fixture: ComponentFixture<CrudListItemHost>) {
        return fixture.debugElement.query(By.css('.ion--iconnewitem')).nativeElement;
    }
});
