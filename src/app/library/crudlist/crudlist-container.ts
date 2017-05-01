import {EicCrudListOperation} from './crudlist-operation';

import { Injectable } from '@angular/core';
import { NavController } from "ionic-angular";

/**
 * Communicate information beetwen crudlist parent component and child components
 *
 * @export
 * @class CrudListContainer
 */
@Injectable()
export class EicCrudListContainer {

    private container: EicCrudListOperation;

    constructor(private _navController: NavController) {
    }

    public get navController(): NavController {
        return this._navController;
    }

    public get parent(): EicCrudListOperation {
        return this.container;
    }

    public set parent(value: EicCrudListOperation) {
        this.container = value;
    }
}



