

export class Inventory {
    ID: string;
    DisplayName: string;
    ID_StockTakingState: string;
    Date: string;

    constructor() {
        this.ID = null;
        this.DisplayName = "";
        this.ID_StockTakingState = null;
        this.Date = null;
    }

    toString() {
        return this.DisplayName + " " + this.ID_StockTakingState;
    }
}
