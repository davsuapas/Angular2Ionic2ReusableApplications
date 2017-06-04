import {EicEnumEditionType} from './edition-type';
import {EicEditionControllerContainer} from './edition-controller-container';
import {EicEditionController} from './edition-controller';
import {EicEditionData} from './edition-data';
import { LibraryTestUtils } from "../test";
import { EicCrudListEditionOperationMock } from "../crudlist/mock";
import { EicNavControllerMock } from "../mock";
import { EIC_PROVIDER_TEST_EDITION_CONTROLLER } from "./provider.test";

import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Injectable, Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ViewController, NavParams } from "ionic-angular";
import { By } from '@angular/platform-browser';

describe('EditionController', () => {

    const model = { id: "1", name: "myName" };
    const CONST_PROP_ORIGINALMODE = "originalModel";

    @Injectable()
    class DataServiceMock implements EicEditionData {

        getById(id) {
            return Observable.of(model);
        }

        save(entity) {
            return Observable.of(entity);
        }
    }

    @Component({
        template: `
        <form [formGroup]="form" novalidate>
            <ion-item>
                <ion-input formControlName="name" type="text"></ion-input>
            </ion-item>
        </form>
        `,
    providers: [DataServiceMock],
    viewProviders: [EicEditionControllerContainer]
    })
    class EditionControllerPage extends EicEditionController {

        constructor(container: EicEditionControllerContainer, editionService: DataServiceMock) {
            super(
                container,
                editionService,
                {
                    name: ["", Validators.required],
                });
        }
    }  

    describe('Initialises', () => {

        it('Is configured to update and model is bound at the form', async(() => {

            configureIonicTestingModule(EicEnumEditionType.update).then(() => {
                    const fixture: ComponentFixture<EditionControllerPage> = TestBed.createComponent(EditionControllerPage);
                    fixture.detectChanges();
                    const element = fixture.debugElement.query(By.css(".text-input")).nativeElement;

                    expect(element.value).toBe(model.name);    
                    expect(fixture.componentInstance[CONST_PROP_ORIGINALMODE]).toEqual(model);

                    fixture.destroy();
                });
        }));  

        it('Is configured to add and the identifier is not defined', async(() => {

            configureIonicTestingModule(EicEnumEditionType.add).then(() => {
                    const fixture: ComponentFixture<EditionControllerPage> = TestBed.createComponent(EditionControllerPage);

                    expect(fixture.componentInstance["editionType"].id).toBeUndefined();

                    fixture.destroy();
                });
        }));  

        function configureIonicTestingModule(editionType: EicEnumEditionType) {

            return LibraryTestUtils.configureIonicTestingModule(
                [EIC_PROVIDER_TEST_EDITION_CONTROLLER, DataServiceMock],
                [EditionControllerPage],
                [ReactiveFormsModule])
                .overrideComponent(
                    EditionControllerPage, {
                        set: {
                            providers: [ {
                                provide: EicEditionControllerContainer,
                                useValue:
                                    new EicEditionControllerContainer(
                                        new FormBuilder(),
                                        new NavParams(
                                            {editionType: editionType, id: model.id}
                                        ),
                                        EicNavControllerMock)
                            }]
                        }
                }).compileComponents();
        }
    });

    describe('Behaviour', () => {

        let fixture: ComponentFixture<EditionControllerPage>;
        let instance: EditionControllerPage;

        beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
            [EditionControllerPage],
            [EIC_PROVIDER_TEST_EDITION_CONTROLLER],
            [ReactiveFormsModule]).then(compiled => {
                fixture = compiled.fixture;
                instance = compiled.instance;
        })));

        afterEach(() => {
            fixture.destroy();
        });
        
        it('Click accept and the form validate with error', () => {
            instance.accept();
            expect(instance.form.controls["name"].touched).toBeTruthy();
        });  

        it('Click accept and adding item in CrudListEditionOperation', () => {

            spyOn(instance, "isAdd").and.returnValue(true);
            const navMock: any = setMockViewController();
            instance.form.patchValue(model);

            instance.accept();

            expect(EicCrudListEditionOperationMock.addItem).toHaveBeenCalledWith({name: "myName" });
            expect(navMock.pop).toHaveBeenCalled();
        });

        it('Click accept and updating item in CrudListEditionOperation', () => {

            spyOn(instance, "isAdd").and.returnValue(false);

            const navMock: any = setMockViewController();
            instance[CONST_PROP_ORIGINALMODE] = model;

            const modelModified = { id: "1", name: "namemodified" };
            instance.form.patchValue(modelModified);

            instance.accept();

            expect(EicCrudListEditionOperationMock.updateItem).toHaveBeenCalledWith(modelModified);
            expect(navMock.pop).toHaveBeenCalled();
        });

        function setMockViewController(): any {

            const view: ViewController = new ViewController();
            view.instance = EicCrudListEditionOperationMock;

            const navMock: any = instance["nav"];
            navMock.getPrevious.and.returnValue(view);

            return navMock;
        }    
    });
});