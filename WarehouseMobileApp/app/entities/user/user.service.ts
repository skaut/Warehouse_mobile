import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";
import { baseRequest } from "../../soap/request/baseRequest";
import { Observable } from "rxjs/Observable";
import * as Constants from "../../constants"
import * as appSettings from "application-settings"


@Injectable()
export class UserService {
    options = {
        responseType: "text" as "text"
    };

    constructor( private httpClient: HttpClient ) {}

    login( user: User ): Observable<any> {
        const url = Constants.SERVER_URL + "Login/";
        const body = this.buildLoginBody(user);
        return this.httpClient.post(
            url,
            body,
            this.options
        );
    }

    userDetail( token: string ): Observable<any> {
        const url = Constants.BASE_SERVICE_URL + "UserManagement.asmx";
        const requestBody =
            `<UserDetail xmlns=\"https://is.skaut.cz/\">
                <userDetailInput>
                    <ID_Login>${token}</ID_Login>
                    <ID_Application>${Constants.APPLICATION_ID}</ID_Application>
                </userDetailInput>
            </UserDetail>`;
        const body = baseRequest(requestBody);
        const options = {
            headers: new HttpHeaders({
                "Content-Type": " text/xml",
                "SOAPAction": "https://is.skaut.cz/UserDetail"
            }),
            responseType: "text" as "text"
        };
        return this.httpClient.post(
            url,
            body,
            options
        );
    }

    private buildLoginBody(user: User): FormData {
        const body = new FormData();
        body.append("appid", Constants.APPLICATION_ID);
        body.append("ctl00$Content$txtUserName", user.name);
        body.append("ctl00$Content$txtPassword", user.password);
        body.append("ctl00$Content$BtnLogin", Constants.BUTTON_LOGIN);
        body.append("__EVENTVALIDATION", Constants.__EVENTVALIDATION);
        body.append("__VIEWSTATE", Constants.__VIEWSTATE);
        body.append("__VIEWSTATEGENERATOR", Constants.__VIEWSTATEGENERATOR);
        return body;
    }
}