import { AbstractControl, ValidationErrors } from "@angular/forms";
import {isNumeric} from "rxjs/util/isNumeric";

export function EicNumericValidator(control: AbstractControl): ValidationErrors | null {
    return isNumeric(control.value) ? undefined : {'eicnumeric': false};
}