import { BaseRequest } from "./baseRequest";


export class WarehouseItemAll extends BaseRequest {
    ID_Unit: string;
    IsDelete: boolean;

    constructor(unitId: string) {
        super();
        this.ID_Unit = unitId;
        this.IsDelete = false;
    }
}