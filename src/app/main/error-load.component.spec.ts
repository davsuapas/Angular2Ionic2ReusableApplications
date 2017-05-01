import {TestUtils} from "../../test";
import {ErrorLoadPage} from "./error-load.component";

import {NavParams, Platform} from "ionic-angular";

import {ComponentFixture, async, inject} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

describe('ErrorLoadpage', () => {

  const descriptionError = "descriptionerror";

  let fixture: ComponentFixture<ErrorLoadPage>;

  beforeEach(async(() => TestUtils.beforeEachCompiler(
    [ErrorLoadPage],
    [{ provide: NavParams, useValue: {data: descriptionError} }]).then(compiled => {
      fixture = compiled.fixture;
  })));

  afterEach(() => {
     fixture.destroy();
  });

  it('should display error description', () => {
     fixture.detectChanges();
     expect(fixture.debugElement.query(By.css("p")).nativeElement.textContent)
         .toContain(descriptionError);
  });

  it('should click exit button and execute platform.exitApp()', inject([Platform], (platform: Platform) => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler("click", undefined);
    expect(platform.exitApp).toHaveBeenCalled();
  }));
});
