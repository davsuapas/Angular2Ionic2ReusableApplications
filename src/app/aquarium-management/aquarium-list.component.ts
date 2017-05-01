import { Component } from "@angular/core";
import { EicCrudListContainer, EicCrudListController, EicCrudListData } from "../library/index";

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

    constructor(container: EicCrudListContainer, aquariumData: EicCrudListData) {
        super(container,
            {
            },
            aquariumData);
    }
}