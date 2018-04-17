
export class UserRole {
    ID: string;
    ID_Role: string;
    ID_Unit: string;
    Role: string;
    Unit: string;

    constructor() {
        this.ID = "";
        this.ID_Role = "";
        this.ID_Unit = "";
        this.Role = "";
        this.Unit = "";
    }

    toString() {
        return this.Unit
    }

    toFullString() {
        return `
        ID: ${this.ID}
        ID_Role: ${this.ID_Role}
        ID_Unit: ${this.ID_Unit}
        Role: ${this.Role}
        Unit: ${this.Unit}`
    }
}
