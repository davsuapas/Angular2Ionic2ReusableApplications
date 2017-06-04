import {EicEditionControllerContainer} from './edition-controller-container';
import {LibraryTestUtils} from "../test";
import { EicEditionAcceptButtonComponent } from "./edition-accept-button.component";
import { EicMockEditionControllerContainer } from "./mock";

import {ComponentFixture, async} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('EditionAcceptButton', () => {

    let fixture: ComponentFixture<EicEditionAcceptButtonComponent>;
    let instance: EicEditionAcceptButtonComponent;

    beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
        [EicEditionAcceptButtonComponent],
        [{provide: EicEditionControllerContainer, useClass: EicMockEditionControllerContainer}]).then(compiled => {

        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('Does a click and call accept in EditionController', () => {
        fixture.debugElement.query(By.css('button')).triggerEventHandler("click", undefined);
        expect(instance["editionController"].accept).toHaveBeenCalled();
  });
});