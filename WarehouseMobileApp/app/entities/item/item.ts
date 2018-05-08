import * as ImageSource from "tns-core-modules/image-source";


/**
 * Class represents item which is offered for borrowing
 */
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

    // field below is necessary for successful reservation insertion and is not received from initial
    ID_Warehouse: string;
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
        this.ID_Warehouse = null;
        this.photo = null;
        this.expanded = false;
    }

    setImageSource() {
        if (this.PhotoContent) {
            this.photo = ImageSource.fromBase64(this.PhotoContent)
        }
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
        InStock: ${this.InStock}
        ID_Warehouse: ${this.ID_Warehouse}`
    }
}