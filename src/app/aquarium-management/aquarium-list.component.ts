import { AquariumManagementDataProvider } from "./aquarium-management-data-provider";
import { AquariumManagementEditionPage } from "./aquarium-edition.component";

import { Component } from "@angular/core";
import { EicCrudListContainer, EicCrudListController } from "../library/index";

/**
 * List all elements of a aquarium. Allow edit and delete items
 * 
 * @export
 * @class AquariumManagementListPage
 * @extends {EicCrudListController}
 */
@Component({
    templateUrl: "aquarium-list.page.html",
    viewProviders: [EicCrudListContainer]
})
export class AquariumManagementListPage extends EicCrudListController {

    constructor(container: EicCrudListContainer, aquariumData: AquariumManagementDataProvider) {
        super(container,
            {
                navAddPage: AquariumManagementEditionPage,
                navEditPage: AquariumManagementEditionPage
            },
            aquariumData);
    }
}