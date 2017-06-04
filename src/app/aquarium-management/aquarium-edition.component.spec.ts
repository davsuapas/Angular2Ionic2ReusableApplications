import {AquariumDataTestMock} from './aquarium-data.test.mock';
import {AquariumManagementEditionPage} from './aquarium-edition.component';
import { AquariumManagementDataProvider } from "./aquarium-management-data-provider";
import {TestUtils} from "../../test";

import { ComponentFixture, async } from '@angular/core/testing';
import { EicFormEditionModule, EicFormValidationModule } from "../library/index";
import { EIC_PROVIDER_TEST_EDITION_CONTROLLER } from "../library/test/index";

describe('AquariumManagementEditionPage', () => {

  let fixture: ComponentFixture<AquariumManagementEditionPage>;
  let instance: AquariumManagementEditionPage;

  beforeEach(async(() => TestUtils.beforeEachCompiler(
    [AquariumManagementEditionPage],
    [
    EIC_PROVIDER_TEST_EDITION_CONTROLLER,
     {provide: AquariumManagementDataProvider, useClass: AquariumDataTestMock}
    ],
    [EicFormEditionModule, EicFormValidationModule]).then(compiled => {
      fixture = compiled.fixture;
      instance = compiled.instance;
  })));

  afterEach(() => {
     fixture.destroy();
  });

  it('Initialises', () => {
      expect(instance).not.toBeNull();
      expect(fixture).not.toBeNull();
  });
});