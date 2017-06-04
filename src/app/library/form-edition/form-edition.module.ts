import { EicEditionAcceptButtonComponent } from "./edition-accept-button.component";

import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        EicEditionAcceptButtonComponent
    ],
    imports: [
        IonicModule,
        ReactiveFormsModule
    ],
    exports: [
        EicEditionAcceptButtonComponent,
        ReactiveFormsModule
    ]
})
export class EicFormEditionModule { }
