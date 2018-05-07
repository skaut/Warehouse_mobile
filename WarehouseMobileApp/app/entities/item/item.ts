
export class Item {
    ID: string;
    DisplayName: string;
    PhotoExtension: string;
    City: string;
    ID_Unit: string;
    Unit: string;
    RentPrice: number;
    RentNote: string;
    InStock: boolean;

    constructor() {
        this.ID = "";
        this.DisplayName = "";
        this.PhotoExtension = "";
        this.City = "";
        this.ID_Unit = "";
        this.Unit = "";
        this.RentPrice = null;
        this.RentNote = "";
        this.InStock = null;
    }

    toString() {
        return this.DisplayName
    }

    toFullString() {
        return `
        ID: ${this.ID}
        DisplayName: ${this.DisplayName}
        City: ${this.City}
        ID_Unit: ${this.ID_Unit}
        Unit: ${this.Unit}
        RenPrice: ${this.RentPrice}
        RentNote: ${this.RentNote}
        InStock: ${this.InStock}`
    }
}