import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";
import * as Constants from "../../constants"
import { Config } from "../config/config";

@Injectable()
export class UserService {

    constructor( private httpClient: HttpClient ) {}

    login( user: User ) {
        const url = Constants.SERVER_URL + "Login/";
        const body = this.buildBody(user);
        const options = {
            responseType: "text" as "text",
        };
        return this.httpClient.post(
            url,
            body,
            options
        );
    }

    private buildBody(user: User) {
        const body = new FormData();
        body.append("appid", Constants.APPLICATION_ID);
        body.append("ctl00$Content$txtUserName", user.name);
        body.append("ctl00$Content$txtPassword", user.password);
        body.append("ctl00$Content$BtnLogin", Constants.BUTTON_LOGIN);
        body.append("__EVENTVALIDATION", Constants.__EVENTVALIDATION);
        body.append("__VIEWSTATE", Constants.__VIEWSTATE);
        // body.append("__VIEWSTATEGENERATOR", Constants.__VIEWSTATEGENERATOR);
        return body;
    }
}