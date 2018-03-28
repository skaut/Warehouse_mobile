import { USER_UNIT_ID } from "../../constants";
import * as AppSettings from "application-settings";


export class LoginUpdateResult {
    ID_Unit: string;

    constructor() {
        this.ID_Unit = "";
    }

    saveData(): void {
        AppSettings.setString(USER_UNIT_ID, this.ID_Unit);
    }

    toString() {
        return this.ID_Unit;
    }
}