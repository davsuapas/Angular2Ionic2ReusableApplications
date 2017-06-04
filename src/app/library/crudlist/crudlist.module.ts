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
        EicCrudListAddButtonComponent,
        EicCrudListItemComponent
    ]
})
export class EicCrudListModule { }
