import { BaseRequest } from "./baseRequest";
import { USER_UNIT_ID } from "../../constants";
import * as AppSettings from "application-settings";


export class WarehouseAll extends BaseRequest {
    ID_Unit: string;

    constructor() {
        super();
        this.ID_Unit = AppSettings.getString(USER_UNIT_ID);
    }
}