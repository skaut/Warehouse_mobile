
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

    // helper for development purposes
    toFullString() {
        return `
        ID: ${this.ID}
        IDRole: ${this.ID_Role}
        IDUnit: ${this.ID_Unit}
        Role: ${this.Role}
        Unit: ${this.Unit}`
    }
}
