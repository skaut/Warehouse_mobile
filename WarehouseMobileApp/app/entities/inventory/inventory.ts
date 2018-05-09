

export class Inventory {
    ID: string;
    DisplayName: string;
    ID_StockTakingState: string;
    Date: string;
    Created: string;
    Warehouses: string;

    constructor() {
        this.ID = null;
        this.DisplayName = null;
        this.ID_StockTakingState = null;
        this.Date = null;
        this.Created = null;
        this.Warehouses = null;
    }

    toString() {
        return this.DisplayName + " " + this.ID_StockTakingState + " Created: " + this.Created;
    }
}
