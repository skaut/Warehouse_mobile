
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

    // fields below are not received from server and are only used locally by app
    synced: boolean;
    expanded: boolean;

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
        this.synced = true;
        this.expanded = false;
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
        InventoryDate: ${this.InventoryDate}
        synced: ${this.synced}
        expanded: ${this.expanded}`
    }
}
