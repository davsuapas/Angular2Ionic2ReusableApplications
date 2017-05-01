import {ContextStorageService} from '../contexts/context-storage.abstract.service';
import {ContextService} from "../contexts/context.service";
import {UserContext} from "../contexts/user-context";
import {LoginService} from "../login/login.service";
import { AccessControlService } from "./access-control.abstract.service";

import {Injectable} from '@angular/core';
import { Logger } from "angular2-logger/core";

/**
 * Checking if user is registered. If user is registered configure context
 * and navigate main page
 * If user is not registered try login against server and navigate main page
 * When error navigate error page
 */
@Injectable()
export class AccessControl extends AccessControlService {

  constructor(
    private contextStorage: ContextStorageService,
    private login: LoginService,
    private contextService: ContextService,
    private logger: Logger) {
      super();
    }

  CheckIn(): Promise<UserContext> {

    return new Promise((resolve, reject) => {
      this.contextStorage.getUser().then(
        (userContext) => {
          this.contextService.setUser(userContext);
          resolve(userContext);
        },
        (error) => this.login.login().then(
          (userContext) => resolve(userContext),
          (error) => reject(error)
        )
      );
    });
  }
}
