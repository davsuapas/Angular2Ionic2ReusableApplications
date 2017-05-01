import {ContextStorageService} from '../contexts/context-storage.abstract.service';
import {AccessControl} from "./access-control.service";
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
        {provide: ContextStorageService, useClass: ContextStorageMock}
      ]);
  });

  it('should get context from repository and configure context', async(() => { inject([AccessControl, ContextService, ContextStorageService], (accessControl: AccessControl, contextService: ContextService, contextStorage: ContextStorageService) => {
    spyOn(contextService, "setUser");

    accessControl.CheckIn().then(
      (context) => {
        expect(contextService.setUser).toHaveBeenCalled();
        expect(context).toEqual(contextMock);
      }
    );
    }); }));

  it('should not get context and then login successfully', async(() => { inject([AccessControl, ContextStorageService], (accessControl: AccessControl, contextStorage: ContextStorageService) => {
    setUserMock(contextStorage);

    accessControl.CheckIn().then(
      (context) => expect(context).toEqual(contextMock)
    );
  }); }));

  it('should not get context and the login throw error', async(() => { inject([AccessControl, ContextStorageService, LoginService], (accessControl: AccessControl, contextStorage: ContextStorageService, loginService: LoginService) => {
    setUserMock(contextStorage);
    spyOn(loginService, "login").and.returnValue(Promise.reject("error"));

    accessControl.CheckIn().catch(
        (error) => expect(error).toMatch(/error/)
    );
  }); }));

  function setUserMock(contextStorage: ContextStorageService) {
      spyOn(contextStorage, "getUser").and.returnValue(Promise.reject("key not found"));
  }
});
