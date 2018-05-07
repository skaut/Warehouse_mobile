import * as ImageSource from "tns-core-modules/image-source";

export class Item {
    ID: string;
    DisplayName: string;
    UnitWithRegistrationNumber: string;
    City: string;
    ID_Unit: string;
    Unit: string;
    RentPrice: number;
    RentNote: string;
    InStock: boolean;
    PhotoContent: string;

    // fields below are not received from server and are only used locally by app
    photo: ImageSource.ImageSource;
    expanded: boolean;

    constructor() {
        this.ID = "";
        this.DisplayName = "";
        this.UnitWithRegistrationNumber = "";
        this.City = "";
        this.ID_Unit = "";
        this.Unit = "";
        this.RentPrice = null;
        this.RentNote = "";
        this.InStock = null;
        this.PhotoContent = null;
        this.photo = null;
        this.expanded = false;
    }

    toString() {
        return this.DisplayName
    }

    toFullString() {
        return `
        ID: ${this.ID}
        DisplayName: ${this.DisplayName}
        UnitWithRegistrationNumber: ${this.UnitWithRegistrationNumber}
        City: ${this.City}
        ID_Unit: ${this.ID_Unit}
        Unit: ${this.Unit}
        RenPrice: ${this.RentPrice}
        RentNote: ${this.RentNote}
        InStock: ${this.InStock}`
    }
}