
export class WarehouseItem {
    ID: string;
    DisplayName: string;
    ID_Warehouse: string;
    InventoryNumber: string;
    Description: string;
    PurchasePrice: string;
    InWarehouse: boolean;
    PurchaseDate: string;
    InventoryDate: string;

    constructor() {
        this.ID = null;
        this.DisplayName = null;
        this.ID_Warehouse = null;
        this.InventoryNumber = null;
        this.Description = null;
        this.PurchasePrice = null;
        this.InWarehouse = null;
        this.PurchaseDate = null;
        this.InventoryDate = null;
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
