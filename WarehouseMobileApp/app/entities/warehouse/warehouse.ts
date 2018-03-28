
export class Warehouse {
    ID: string;
    DisplayName: string;
    ID_WarehouseMain: string;

    constructor() {
        this.ID = "";
        this.DisplayName = "";
        this.ID_WarehouseMain = "";
    }

    toString() {
        return this.DisplayName
    }

    toFullString() {
        return `
        ID: ${this.ID}
        DisplayName: ${this.DisplayName}
        ID_WarehouseMain: ${this.ID_WarehouseMain}`
    }
}