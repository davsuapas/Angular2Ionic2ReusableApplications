import {LibraryTestUtils} from "../test";
import { EicEditionErrorMessageComponent } from "./edition-error-message.component";

import {ComponentFixture, async} from '@angular/core/testing';
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe('EditionErrorMessage', () => {

    @Component({
        template: '<eic-edition-error-message validationName="required" controlName="name" [formGroup]="form"><div id="diverror">error</div></eic-edition-error-message>'
    })
    class ErrorMessageHost {

        form: FormGroup;

        constructor(private formBuilder: FormBuilder) {
            this.form = formBuilder.group({name: ["", Validators.required]});
        }
    }    

    let fixture: ComponentFixture<ErrorMessageHost>;
    let instance: ErrorMessageHost;

    beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
        [ErrorMessageHost, EicEditionErrorMessageComponent], [],
        [ReactiveFormsModule]).then(compiled => {

        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('There is a error and it is showed', () => {

        instance.form.controls["name"].markAsTouched();
        fixture.detectChanges();

        const element = fixture.debugElement.query(By.css("#diverror")).nativeElement;

        expect(element.innerText).toBe("error");
    });
});