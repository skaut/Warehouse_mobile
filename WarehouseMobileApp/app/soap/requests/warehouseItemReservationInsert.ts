import { BaseRequest } from "./baseRequest";
import { Item } from "../../entities/item/item";
import { USER_ID, USER_PERSON_NAME, USER_UNIT_ID } from "../../constants";
import * as AppSettings from "application-settings";


export class WarehouseItemReservationInsert extends BaseRequest {
    ID_Unit: string;
    ID_User: string;
    ID_Warehouse: string;
    ID_WarehouseItem: string;
    ID_UnitOrigin: string;
    EstimatedStartDate: string;
    EstimatedEndDate: string;
    Person: string;

    constructor(item: Item, startDate: string, endDate: string) {
        super();
        this.ID_Unit = AppSettings.getString(USER_UNIT_ID, null);
        this.ID_User = AppSettings.getString(USER_ID, null);
        this.ID_Warehouse = item.ID_Warehouse;
        this.ID_WarehouseItem = item.ID;
        this.ID_UnitOrigin = item.ID_Unit;
        this.EstimatedStartDate = startDate;
        this.EstimatedEndDate = endDate;
        this.Person = AppSettings.getString(USER_PERSON_NAME);
    }
}
