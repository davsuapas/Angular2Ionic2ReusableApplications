import {AquariumDataTestMock} from './aquarium-data.test.mock';
import {AquariumManagementListPage} from './aquarium-list.component';
import { AquariumManagementDataProvider } from "./aquarium-management-data-provider";
import {TestUtils} from "../../test";

import { ComponentFixture, async } from '@angular/core/testing';
import {EIC_PROVIDER_TEST_CRUDLIST } from "../library/test/index";
import { EicCrudListModule } from "../library/index";

describe('AquariumManagementListPage', () => {

  let fixture: ComponentFixture<AquariumManagementListPage>;
  let instance: AquariumManagementListPage;

  beforeEach(async(() => TestUtils.beforeEachCompiler(
    [AquariumManagementListPage],
    [EIC_PROVIDER_TEST_CRUDLIST,
      {provide: AquariumManagementDataProvider, useClass: AquariumDataTestMock} 
    ], 
    [EicCrudListModule]).then(compiled => {
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