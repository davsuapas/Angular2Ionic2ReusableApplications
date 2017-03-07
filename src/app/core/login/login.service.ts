import {UserContext} from "../contexts/user-context";
import {ContextStorage} from "../contexts/context-storage.service";
import {ContextService} from "../contexts/context.service";

import {Injectable} from '@angular/core';
import {EicOauth2AuthorizeService, eicformatlog} from "elipcero-ionic-core";
import {Logger} from "angular2-logger/core";

/**
 * Login user and configure global context information
 */
@Injectable()
export class LoginService {

  constructor(
    private contextService: ContextService,
    private contextStorage: ContextStorage,
    private oauth2Auth: EicOauth2AuthorizeService,
    private logger: Logger) { }

  login(): Promise<UserContext> {

    return new Promise((resolve, reject) => {
      this.oauth2Auth.authorizeInBrowser().then(
        (data) => {
           this.logger.info(eicformatlog(LoginService.name, data, true));
           let context: UserContext = {profileId: data.profile, securityToken: data.access_token};
           this.contextStorage.saveUser(context).then(
             () => {
               this.contextService.setUser(context);
               resolve(context);
             },
             (error) => reject("Error almacenando la información en el dispositvo movil.")
           );
         },
         (error) => reject("Error autenticando en el sistema")
      );
    });
  }
}
