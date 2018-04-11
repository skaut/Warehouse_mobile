
export class WarehouseItem {
    ID: string;
    DisplayName: string;
    ID_Warehouse: string;
    InventoryNumber: string;
    Description: string;
    PurchasePrice: number;
    InWarehouse: boolean;
    PurchaseDate: string;
    InventoryDate: string;

    constructor() {
        this.ID = "";
        this.DisplayName = "";
        this.ID_Warehouse = "";
        this.InventoryNumber = "";
        this.Description = "";
        this.PurchasePrice = null;
        this.InWarehouse = null;
        this.PurchaseDate = "";
        this.InventoryDate = "";
    }

    toString() {
        return this.DisplayName
    }

    toFullString() {
        return `
        ID: ${this.ID}
        DisplayName: ${this.DisplayName}
        ID_Warehouse: ${this.ID_Warehouse}
        InventoryNumber: ${this.InventoryNumber}
        Description: ${this.Description}
        PurchasePrice: ${this.PurchasePrice}
        InWarehouse: ${this.InWarehouse}
        PurchaseDate: ${this.PurchaseDate}
        InventoryDate: ${this.InventoryDate}`
    }
}
