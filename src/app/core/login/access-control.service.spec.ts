import {AccessControl} from "./access-control.service";
import {ContextStorage} from "../contexts/context-storage.service";
import {LoginService} from "../login/login.service";
import {ContextService} from "../contexts/context.service";
import {TestUtils} from "../../../test";

import {ContextStorageMock, contextMock, LoginServiceMock} from "../../core/mock";

import {inject, async} from '@angular/core/testing';

describe('AccessControlService', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([
        ContextService,
        AccessControl,
        {provide: LoginService, useClass: LoginServiceMock},
        {provide: ContextStorage, useClass: ContextStorageMock}
      ])
  });

  it('should get context from repository and configure context', async(() => { inject([AccessControl, ContextService, ContextStorage], (accessControl: AccessControl, contextService: ContextService, contextStorage: ContextStorage) => {
    spyOn(contextService, "setUser");

    accessControl.CheckIn().then(
      (context) => {
        expect(contextService.setUser).toHaveBeenCalled();
        expect(context).toEqual(contextMock);
      }
    );
  })}));

  it('should not get context and then login successfully', async(() => { inject([AccessControl, ContextStorage], (accessControl: AccessControl, contextStorage: ContextStorage) => {
    setUserMock(contextStorage);

    accessControl.CheckIn().then(
      (context) => expect(context).toEqual(contextMock)
    );
  })}));

  it('should not get context and the login throw error', async(() => { inject([AccessControl, ContextStorage, LoginService], (accessControl: AccessControl, contextStorage: ContextStorage, loginService: LoginService) => {
    setUserMock(contextStorage);
    spyOn(loginService, "login").and.returnValue(Promise.reject("error"));

    accessControl.CheckIn().catch(
        (error) => expect(error).toMatch(/error/)
    );
  })}));

  function setUserMock(contextStorage: ContextStorage) {
      spyOn(contextStorage, "getUser").and.returnValue(Promise.reject("key not found"));
  }
});
