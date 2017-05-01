import {UserContext} from "./user-context";
import { ContextStorageService } from "./context-storage.abstract.service";

import {Injectable} from '@angular/core';
import {SecureStorage, SecureStorageObject} from '@ionic-native/secure-storage';
import { Logger } from "angular2-logger/core";
import { eicformatlog } from "../../library/index";

/*
Storaging context in mobile storage secure
 */
@Injectable()
export class ContextStorage extends ContextStorageService {

  private readonly storageItemName = "user-context";

  private storage: SecureStorageObject;

  constructor(private logger: Logger, private secureStorage: SecureStorage) {
    super();
  }

  init(): Promise<any> {
    return this.secureStorage.create('sushi-storage')
      .then( (storageObject: SecureStorageObject) => {
         this.storage = storageObject;
      })
      .catch(
       error => {
         this.logger.error(error);
         return Promise.reject(error);
       }
     );
  }

  getUser(): Promise<UserContext> {
    return this.storage.get(this.storageItemName)
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
    return this.storage.set(this.storageItemName, JSON.stringify(context))
      .catch(
        error => {
          this.logger.error(error);
          return Promise.reject(error);
        }
      );
  }
}
