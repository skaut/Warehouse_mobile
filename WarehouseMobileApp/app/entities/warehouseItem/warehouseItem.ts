import * as ImageSource from "tns-core-modules/image-source";

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
    PhotoContent: string;

    // fields below are not received from server and are only used locally by app
    photo: ImageSource.ImageSource;
    synced: boolean;
    expanded: boolean;
    // to prevent multiple inventarization attempts
    lastInventoryId: string;

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
        this.PhotoContent = null;
        this.photo = null;
        this.synced = true;
        this.expanded = false;
        this.lastInventoryId = null;
    }

    setImageSource() {
        if (this.PhotoContent) {
            this.photo = ImageSource.fromBase64(this.PhotoContent);
        }
    }

    toString() {
        return this.DisplayName
    }

    toFullString() {
        const photo = this.PhotoContent ? this.PhotoContent.slice(0, 50) + "..." : null;
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
        PhotoContent: ${photo}
        synced: ${this.synced}
        expanded: ${this.expanded}
        lastInventoryId: ${this.lastInventoryId}`
    }
}
