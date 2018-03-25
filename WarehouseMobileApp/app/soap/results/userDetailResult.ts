import { USER_ID, USER_PERSON_ID, USER_PERSON_NAME } from "../../constants";
import * as AppSettings from "application-settings";


export class UserDetailResult {
    ID: string;
    ID_Person: string;
    Person: string;

    constructor() {
        this.ID = "";
        this.ID_Person = "";
        this.Person = "";
    }

    saveData(): void {
        AppSettings.setString(USER_ID, this.ID);
        AppSettings.setString(USER_PERSON_ID, this.ID_Person);
        AppSettings.setString(USER_PERSON_NAME, this.Person);
    }

    toString(): string {
        return "ID: " + this.ID + ", ID_Person: " + this.ID_Person + ", Person: " + this.Person
    }
}
