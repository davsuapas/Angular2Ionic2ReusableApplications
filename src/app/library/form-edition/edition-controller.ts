import { EicCrudListEditionOperation } from "../crudlist/crudlist-edition-operation";
import { EicEditionControllerOperation } from "./edition-controller-operation";
import { EicEditionControllerContainer } from "./edition-controller-container";
import { EicEditionType, EicEnumEditionType } from "./edition-type";
import { EicEditionData } from "./edition-data";

import { OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavController, ViewController } from "ionic-angular";

/**
 * Implements the operations for adding or updating
 * You must set providers: [EicEditionControllerContainer] in the class
 * what inherit of {@link EicEditionController}.
 * This class only support one ControlGroup for validation
 * Properties of the class to use in html:
 *  - FormGroup form: Controls for formControlName directive and
 *    [formModel] attribute from epc-errormessage component
 */
export abstract class EicEditionController implements OnInit, EicEditionControllerOperation {

    form: FormGroup;
    private editionType: EicEditionType;
    private nav: NavController;
    private originalModel: any;

    constructor(container: EicEditionControllerContainer, private editionService: EicEditionData, controls: {[key: string]: any}) {

        // Inject into actual context to propagate EicEditionController for child
        // Look at {@link EicEditionControllerContainer}
        container.editionController = this;

        this.editionType = {
            type: container.navParams.get("editionType")
        };

        if (!this.isAdd()) {
            this.editionType.id = container.navParams.get("id");
        }

        this.nav = container.navController;
        
        this.form = container.formBuilder.group(controls);
    }

    /**
     * Depending of the parameters, read a entity by id or create new entity
     * wait is implemented by {@link EicEditionData}
     */
    ngOnInit() {

        if (!this.isAdd()) {
            this.editionService.getById(this.editionType.id).subscribe(
                model => {
                    this.originalModel = model;
                    this.form.patchValue(model); 
                }
           );
       }
    }

    /**
     * If form is valid save entity and refresh list page (if exists)
     * If is not valid show errors in page
     */
    accept() {

        if (this.form.valid) {

            this.editionService.save(this.getModelForSaving()).subscribe(

                modelSaved => { 

                    const view: ViewController = this.nav.getPrevious(this.nav.getActive());

                    // There is not way check interface in typescript,
                    // so use 'view.getContent().addItem' to check
                    if (view && view.instance.addItem) {

                        const listController: EicCrudListEditionOperation = view.instance;

                        if (this.isAdd()) {
                            listController.addItem(modelSaved);
                        }
                        else {
                            listController.updateItem(modelSaved);
                        }

                        this.nav.pop();
                    }
                }
            );
        }
        else {
            this.showErrors();
        }
    }

    /**
     * Updating the orignal model with modified values of the form and get
     */
    private getModelForSaving(): any {

        let modelForSaving = {};

        if (!this.isAdd()) {
            modelForSaving = this.originalModel;
        }

        Object.keys(this.form.value).forEach(
            k => modelForSaving[k] = this.form.value[k]
        );

        return modelForSaving;
    }

    /**
     * The controls don't show errors if is not touched. Force
     * to show errors marking touched in controls
     */
    private showErrors() {
        Object.keys(this.form.controls).forEach(k => this.form.controls[k].markAsTouched());
    }

    private isAdd(): boolean {
        return this.editionType.type === EicEnumEditionType.add;
    }
}

