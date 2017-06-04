import { EicNumericValidator } from "./validator";

import { FormGroup, FormBuilder} from "@angular/forms";

describe('Validator', () => {

    it('Form Validator: Validate that a control is numeric', () => {
        const form: FormGroup = new FormBuilder().group({number: ["A", EicNumericValidator]});
        expect(form.valid).toBeFalsy();
    });

    it('Form Validator: Validate that a control is not numeric', () => {
        const form: FormGroup = new FormBuilder().group({number: [1, EicNumericValidator]});
        expect(form.valid).toBeTruthy();
    });
});