import {LoginService} from './login.service';
import {ContextStorage} from "../contexts/context-storage.service";
import {ContextService} from "../contexts/context.service";

import {ContextStorageMock, contextMock} from "../mock";
import {TestUtils} from "../../../test";

import {inject, async} from '@angular/core/testing';
import {EicOauth2AuthorizeService} from "elipcero-ionic-core"

describe('LoginService', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([
        ContextService,
        LoginService,
        {provide: EicOauth2AuthorizeService, useValue: new EicOauth2AuthorizeService(null, null)},
        {provide: ContextStorage, useClass: ContextStorageMock}
      ])
  });

  it('should login and configure context', async(() => { inject([LoginService, EicOauth2AuthorizeService, ContextService], (loginService: LoginService, authService: EicOauth2AuthorizeService, contextService: ContextService) => {
    setAuthServiceMock(authService);
    spyOn(contextService, "setUser");

    loginService.login().then(
      (context) => {
        expect(contextService.setUser).toHaveBeenCalled();
        expect(context).toEqual(contextMock);
      }
    );
  })}));

  it('should get error storaging information context', async(() => { inject([LoginService, EicOauth2AuthorizeService, ContextStorage], (loginService: LoginService, authService: EicOauth2AuthorizeService, contextStorage: ContextStorage) => {
    setAuthServiceMock(authService);

    spyOn(contextStorage, "saveUser").and.returnValue(Promise.reject("error"));

    loginService.login().catch(
        (error) => expect(error).toMatch(/storaging/)
    );
  })}));

  it('should get error calling authorizeInBrowser', async(() => { inject([LoginService, EicOauth2AuthorizeService], (loginService: LoginService, authService: EicOauth2AuthorizeService) => {
    spyOn(authService, "authorizeInBrowser").and.returnValue(Promise.reject("error"));

    loginService.login().catch(
        (error) => expect(error).toMatch(/system/)
    );
  })}));

  function setAuthServiceMock(authService: EicOauth2AuthorizeService) {
    spyOn(authService, "authorizeInBrowser")
      .and.returnValue(Promise.resolve({profileId: "p", access_token: "t"}));
  }
});
