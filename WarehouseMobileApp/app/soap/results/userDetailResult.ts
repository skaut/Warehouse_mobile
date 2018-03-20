
export class UserDetailResult {
    ID: string;
    ID_Person: string;
    Person: string;

    constructor() {
        this.ID = "";
        this.ID_Person = "";
        this.Person = "";
    }

    toString() {
        return "ID: " + this.ID + ", ID_Person: " + this.ID_Person + ", Person: " + this.Person
    }
}
