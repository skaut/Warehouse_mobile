import { Item } from "../../entities/item/item";


export class WarehouseItemAllBorrowableResult {
    Items = Array<Item>();

    constructor() {
        this.Items = [];
    }
}
