import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import * as appSettings from "application-settings"
import * as Constants from "../../constants";


@Injectable()
export class BaseRequest {

    ID_Application: string = Constants.APPLICATION_ID;

    /**
     * Method for post call on skautIS webservice
     *
     * @param entity object used to get required parameters and xml tags names
     * @param {string} serviceName to call on backend api
     * @returns {Observable<any>} result of post request
     */
    call(entity: any, serviceName: string, httpClient: HttpClient): Observable<any> {
        // const entityName = entity.constructor.name;
        const options = {
            headers: new HttpHeaders({
                "Content-Type": "text/xml",
                // "SOAPAction": `https://is.skaut.cz/${entityName}`
            }),
            responseType: "text" as "text"
        };
        return httpClient.post(
            Constants.BASE_SERVICE_URL + serviceName + ".asmx",
            this.getBody(entity, entity.constructor.name),
            options
        );
    }

    private getBody(entity: any, entityName: string) {
        const requestParams = Object.getOwnPropertyNames(entity)
            .map(element => `<${element}>${entity[element]}</${element}>`);
        return `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                  <soap12:Body>
                    <${entityName} xmlns="https://is.skaut.cz/">
                      <${this.lowerCaseFirstLetter(entityName)}Input>
                        <ID_Login>${appSettings.getString("token")}</ID_Login>
                        ${requestParams.join('')}
                      </${this.lowerCaseFirstLetter(entityName)}Input>
                    </${entityName}>
                  </soap12:Body>
                </soap12:Envelope>`;
    }

    private lowerCaseFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
}