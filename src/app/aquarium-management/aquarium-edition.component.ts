import { AquariumManagementDataProvider } from "./aquarium-management-data-provider";

import { Component } from "@angular/core";
import { EicEditionController, EicEditionControllerContainer, EicNumericValidator } from "../library/index";
import { Validators } from "@angular/forms";

/**
 * Edit the aquarium domain. Depending of the parameters allow add
 * new entity or update aquarium domain
 */
@Component({
    templateUrl: "aquarium-edition.page.html",
    viewProviders: [EicEditionControllerContainer]
})
export class AquariumManagementEditionPage extends EicEditionController {
    constructor(container: EicEditionControllerContainer, aquariumData: AquariumManagementDataProvider) {
        super(
            container,
            aquariumData,
            {
                name: ["", [Validators.required, Validators.maxLength(30)]],
                type: ["freshWater"],
                high: [0, EicNumericValidator],
                width: [0, EicNumericValidator],
                deep: [0, EicNumericValidator],
                capacity: [0, EicNumericValidator]
            }
        );
    }
}