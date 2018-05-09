import { Inventory } from "../../entities/inventory/inventory";


export class StockTakingAllResult {
    // this param has to be named with typo due to generic parsing which requires array field with name of entity + s
    Inventorys = Array<Inventory>();

    constructor() {
        this.Inventorys = [];
    }
}
