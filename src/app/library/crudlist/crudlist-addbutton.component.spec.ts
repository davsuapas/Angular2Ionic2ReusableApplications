import {eicCrudListContainerMock} from "./mock";
import {EicCrudListAddButtonComponent} from "./crudlist-addbutton.component";
import { EicCrudListContainer } from "./crudlist-container";
import { LibraryTestUtils } from "../test";

import {ComponentFixture, async} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('EicCrudListAddButton', () => {

  let fixture: ComponentFixture<EicCrudListAddButtonComponent>;
  let instance: EicCrudListAddButtonComponent;

  beforeEach(async(() => LibraryTestUtils.beforeEachCompiler(
    [EicCrudListAddButtonComponent],
    [{provide: EicCrudListContainer, useValue: eicCrudListContainerMock}]).then(compiled => {
      fixture = compiled.fixture;
      instance = compiled.instance;
  })));

  afterEach(() => {
     fixture.destroy();
  });

  it('Should click add button and execute navAddItem from EicCrudListController', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler("click", undefined);
    expect(instance["listController"].navAddItem).toHaveBeenCalled();
  });
});
