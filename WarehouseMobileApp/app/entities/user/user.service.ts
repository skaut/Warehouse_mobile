import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";
import { Observable } from "rxjs/Observable";
import * as Constants from "../../constants"
import { UserDetail } from "../../soap/requests/userDetail";


@Injectable()
export class UserService {

    serviceName: string = "UserManagement";

    constructor( private httpClient: HttpClient ) {}


    login( user: User ): Observable<any> {
        const url = Constants.SERVER_URL + "Login/";
        const body = this.buildLoginBody(user);
        return this.httpClient.post(
            url,
            body,
            { responseType: "text" as "text" }
        );
    }

    getUserDetail(userDetail: UserDetail) {
        return userDetail.call(userDetail, this.serviceName, this.httpClient);
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