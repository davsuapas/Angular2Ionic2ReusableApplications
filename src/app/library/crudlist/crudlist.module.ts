import {EicCrudListItemComponent} from './crudlist-item.component';
import {EicCrudListAddButtonComponent} from './crudlist-addbutton.component';

import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";

@NgModule({
    declarations: [
        EicCrudListAddButtonComponent,
        EicCrudListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        IonicModule,
        EicCrudListAddButtonComponent,
        EicCrudListItemComponent
    ]
})
export class EicCrudListModule { }
