import {UserContext} from "./user-context";

import {Injectable} from '@angular/core';

/*
Storaging context applicaion global information
 */
@Injectable()
export class ContextService {

  private context: UserContext

  constructor() { }

  setUser(context: UserContext) {
      this.context = context;
  }

  getUser(): UserContext {
    if (this.context) {
      return this.context;
    }
    else {
      throw new Error("ContextService. UserContext is null");
    }
  }
}
