
export class Warehouse {
    ID: string;
    DisplayName: string;
    ID_WarehouseMain: string;
    ID_Unit: string;

    constructor() {
        this.ID = null;
        this.DisplayName = null;
        this.ID_WarehouseMain = null;
        this.ID_Unit = null;
    }

    toString() {
        return this.DisplayName
    }

    toFullString() {
        return `
        ID: ${this.ID}
        DisplayName: ${this.DisplayName}
        ID_WarehouseMain: ${this.ID_WarehouseMain}
        ID_Unit: ${this.ID_Unit}`
    }
}
