import {EicEditionErrorMessageComponent} from './edition-error-message.component';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        EicEditionErrorMessageComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule
    ],
    exports: [
        EicEditionErrorMessageComponent,
    ]
})
export class EicFormValidationModule { }
