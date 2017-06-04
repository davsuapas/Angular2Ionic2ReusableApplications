import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "eic-edition-error-message",
    template: `
        <div class="eic-edition-error-box" *ngIf="hasError() && isTouched()">
            <ng-content></ng-content>
        </div>
        `,
})
export class EicEditionErrorMessageComponent {

    @Input() validationName: string;
    @Input() controlName: string;
    @Input() formGroup: FormGroup;

    public isTouched(): boolean {
        return this.formGroup.get(this.controlName).touched;
    }

    public hasError(): boolean {
        return this.formGroup.hasError(this.validationName, [this.controlName]);
    }
}
