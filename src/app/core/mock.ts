import {UserContext} from "./contexts/user-context";

export let contextMock: UserContext = { profileId: "p", securityToken: "t"};

export class ContextStorageMock {
  saveUser(context: UserContext): Promise<any> {
    return Promise.resolve();
  }

  getUser(): Promise<UserContext> {
    return Promise.resolve(contextMock);
  }
}

export class LoginServiceMock {
  login(): Promise<UserContext> {
    return Promise.resolve(contextMock);
  }
}
