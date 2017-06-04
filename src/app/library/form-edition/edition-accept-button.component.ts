import {EicEditionControllerOperation} from './edition-controller-operation';
import { EicEditionControllerContainer } from "./edition-controller-container";

import { Component } from "@angular/core";

/**
 * When user click the check button, the component send message to the edition controller
 * for saving model
 */
@Component({
    selector: "eic-edition-accept-button",
    template: `
         <ion-buttons end>
            <button (click) = "editionController.accept()">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
            </button>
         </ion-buttons>
       `
})
export class EicEditionAcceptButtonComponent {

    private editionController: EicEditionControllerOperation;

    constructor(container: EicEditionControllerContainer) {
        this.editionController = container.editionController;
    }
}
