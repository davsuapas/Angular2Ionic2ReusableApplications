import {UserContext} from "./user-context";

import {Injectable} from '@angular/core';
import {SecureStorage} from 'ionic-native';
import {Logger} from "angular2-logger/core";
import {eicformatlog} from "elipcero-ionic-core";

/*
Storaging context in mobile storage secure
 */
@Injectable()
export class ContextStorage {

  private secureStorage: SecureStorage;

  private readonly storageItemName: string = "user-context";

  constructor(private logger: Logger) {
  }

  init(): Promise<any> {
    this.secureStorage = new SecureStorage();

    return this.secureStorage.create('sushi-storage')
     .catch(
       error => {
         this.logger.error(error);
         return Promise.reject(error);
       }
     );
  }

  getUser(): Promise<UserContext> {
    return this.secureStorage.get(this.storageItemName)
      .then(
        data => {
          this.logger.debug(eicformatlog(ContextStorage.name, data));
          return JSON.parse(data);
        },
        error => {
          this.logger.error(error);
          return Promise.reject(error);
        }
      );
  }

  saveUser(context: UserContext): Promise<any> {
    return this.secureStorage.set(this.storageItemName, JSON.stringify(context))
      .catch(
        error => {
          this.logger.error(error);
          return Promise.reject(error);
        }
      );
  }
}
