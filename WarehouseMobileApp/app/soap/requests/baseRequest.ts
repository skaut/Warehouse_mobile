import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { USER_TOKEN, APPLICATION_ID } from "../../constants";
import { Injectable } from "@angular/core";
import { lowerCaseFirstLetter } from "../../utils/functions";
import * as AppSettings from "application-settings"
import * as Constants from "../../constants";


@Injectable()
export class BaseRequest {

    ID_Application: string = APPLICATION_ID;
    ID_Login: string = AppSettings.getString(USER_TOKEN, "");

    /**
     * Method for post call on skautIS webservice
     *
     * @param entity object used to get required parameters and xml tags names
     * @param {string} serviceName to call on backend api
     * @returns {Observable<any>} result of post request
     */
    call(entity: any, serviceName: string, httpClient: HttpClient, shouldRemoveInsertPart?: boolean): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                "Content-Type": "text/xml",
                // "SOAPAction": `https://is.skaut.cz/${entityName}`
            }),
            responseType: "text" as "text"
        };
        return httpClient.post(
            Constants.BASE_SERVICE_URL + serviceName + ".asmx",
            this.getBody(entity, entity.constructor.name, shouldRemoveInsertPart),
            options
        );
    }

    /**
     * Method to generate body for the http service call from mapping entity.
     * It uses names of entity and its fields to create the body.
     *
     * @param entity - mapping entity
     * @param {string} entityName - name of the entity
     * @param shouldRemoveInsertPart - In some cases soap api has different format. When this occur we need to remove the extra part from name
     * @returns {string} - body for soap call
     */
    private getBody(entity: any, entityName: string, shouldRemoveInsertPart?: boolean): string {
        const requestParams = Object.getOwnPropertyNames(entity)
            .map(element => `<${element}>${entity[element]}</${element}>`);
        return `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                  <soap12:Body>
                    <${entityName} xmlns="https://is.skaut.cz/">
                      <${shouldRemoveInsertPart ? lowerCaseFirstLetter(entityName).split("Insert")[0] : lowerCaseFirstLetter(entityName) + 'Input'}>
                        ${requestParams.join('')}
                      </${shouldRemoveInsertPart ? lowerCaseFirstLetter(entityName).split("Insert")[0] : lowerCaseFirstLetter(entityName) + 'Input'}>
                    </${entityName}>
                  </soap12:Body>
                </soap12:Envelope>`;
    }
}