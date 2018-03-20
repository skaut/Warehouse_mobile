import { BaseRequest } from "./baseRequest";
import { USER_ID } from "../../constants";
import * as AppSettings from "application-settings";


export class UserRoleAll extends BaseRequest {
    ID_User: string;
    IsActive: boolean;

    constructor() {
        super();
        this.ID_User = AppSettings.getString(USER_ID);
        this.IsActive = true;
    }
}