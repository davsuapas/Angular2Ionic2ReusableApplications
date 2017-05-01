import {EicOauth2ConfigAuthorize} from "./oauth2-config-authorize";
import {eicformatlog} from "../loggers/formatter";

import {Injectable} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Logger} from "angular2-logger/core";

/**
 * Autentication against oauth2 server using implicit grantype
 */
@Injectable()
export class EicOauth2AuthorizeService {

  constructor(
      private config: EicOauth2ConfigAuthorize,
      private logger: Logger,
      private appBrowser: InAppBrowser) { }

  /**
   * Autentication against oauth2 server using implicit grantype
   * All process is done into browser
   * @return {Promise<any>} array of properties included access_token
   */
  public authorizeInBrowser(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.logger.info(eicformatlog(EicOauth2AuthorizeService.name, "Config: " + this.config, true));

      const uri = this.config.authorizeUrl +
        "?client_id=" + this.config.params.clientId +
        "&redirect_uri=http://localhost/callback&response_type=token";

      const browserRef = this.appBrowser.create(uri,
          "_blank", "location=no,clearsessioncache=yes,clearcache=yes");

      this.logger.debug(eicformatlog(EicOauth2AuthorizeService.name, "URI: " + uri));

      browserRef.on("loadstart").subscribe(event => {

          if ((event.url).indexOf("http://localhost/callback") === 0) {

              browserRef.on("exit").subscribe(event => {});
              browserRef.close();

              this.logger.debug(eicformatlog(EicOauth2AuthorizeService.name, "URL callback: " + event.url));

              const responseParameters = ((event.url).split("#")[1]).split("&");
              const parsedResponse = {};

              for (const responseParameter of responseParameters) {
                  parsedResponse[responseParameter.split("=")[0]] = responseParameter.split("=")[1];
              }

              if (parsedResponse["access_token"] !== undefined) {
                  resolve(parsedResponse);
              } else {
                  reject();
              }
          }
      });

      browserRef.on("exit").subscribe( event => {
          reject();
      });
    });
  }
}
