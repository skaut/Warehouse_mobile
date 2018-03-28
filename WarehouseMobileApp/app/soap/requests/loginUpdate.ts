import { BaseRequest } from "./baseRequest";
import { USER_TOKEN } from "../../constants";
import * as AppSettings from "application-settings";


export class LoginUpdate extends BaseRequest {
    ID_UserRole: string;
    ID: string;

    constructor(newRoleId: string) {
        super();
        this.ID_UserRole = newRoleId;
        this.ID = AppSettings.getString(USER_TOKEN);
    }
}