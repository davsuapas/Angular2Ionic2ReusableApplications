import { EicEditionControllerOperation } from "./edition-controller-operation";

import { Injectable } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { FormBuilder } from "@angular/forms";

/**
 * This class is used to propagate {@link EicEditionController} to child components.
 * I can not inject to child, the class that inherit {@link EicEditionController} because
 * the injection don't work with inherit
 * The child need resolve the base class {@link EditionController} using DI,
 * but this don't work. In this way, use this class to propagate {@link EicEditionController}
 * Also this class is used like factory to transport information from main page
 * to {@link EditionController}
 */
@Injectable()
export class EicEditionControllerContainer {

    private _editionController: EicEditionControllerOperation;

    constructor(private form: FormBuilder, private params: NavParams, private nav: NavController) {
    }

    get formBuilder(): FormBuilder {
        return this.form;
    }

    get navParams(): NavParams {
        return this.params;
    }

    get navController(): NavController {
        return this.nav;
    }

    get editionController(): EicEditionControllerOperation {
        return this._editionController;
    }

    set editionController(value: EicEditionControllerOperation) {
        this._editionController = value;
    }
}