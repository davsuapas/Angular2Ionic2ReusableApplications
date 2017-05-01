import {AquariumDataTestMock} from './aquarium-data.test.mock';
import {AquariumManagementListPage} from './aquarium-list.component';
import {TestUtils} from "../../test";

import { ComponentFixture, async } from '@angular/core/testing';
import { EIC_COMPONENT_TEST_CRUDLIST, EIC_PROVIDER_TEST_CRUDLIST } from "../library/test/index";
import { EicCrudListData } from "../library/index";

describe('AquariumManagementListPage', () => {

  let fixture: ComponentFixture<AquariumManagementListPage>;
  let instance: AquariumManagementListPage;

  beforeEach(async(() => TestUtils.beforeEachCompiler(
    [AquariumManagementListPage, EIC_COMPONENT_TEST_CRUDLIST],
    [EIC_PROVIDER_TEST_CRUDLIST,
      {provide: EicCrudListData, useClass: AquariumDataTestMock} 
    ]).then(compiled => {
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