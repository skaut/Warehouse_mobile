import { Injectable } from "@angular/core";
import { WarehouseItem } from "../entities/warehouseItem/warehouseItem";
import { Warehouse } from "../entities/warehouse/warehouse";
const Sqlite = require("nativescript-sqlite");


@Injectable()
export class Database {
    private db: any;

    constructor() {
        new Sqlite("").then(database => {
                this.db = database;
                this.prepareTables()
            }, error => {
                console.log("open db error", error)
            }
        )
    }

    /**
     * Method to prepare tables in database
     */
    private prepareTables(): void {
        this.db.execSQL(`
            CREATE TABLE IF NOT EXISTS warehouse (
                id TEXT PRIMARY KEY,
                name TEXT,
                id_parent TEXT,
                id_unit TEXT
                )`)
            .then(() => {
                // console.log("success creating warehouse table");
                this.db.execSQL(`
                    CREATE TABLE IF NOT EXISTS item (
                        id TEXT PRIMARY KEY,
                        name TEXT,
                        id_warehouse TEXT,
                        inventory_number TEXT,
                        description TEXT,
                        purchase_price TEXT,
                        in_warehouse INTEGER, 
                        purchase_date TEXT,
                        inventory_date TEXT,
                        photo_content BLOB,
                        synced INTEGER,
                        FOREIGN KEY(id_warehouse) REFERENCES warehouse(id)
                    )`)
                    .then(() => {
                            // console.log("success creating item table")
                        },
                        error => {
                            console.log("create table item error", error)
                        })
            }, error => {
                console.log("create table warehouse error.", error)
            });
    }

    /**
     * Method to insert row in warehouse table
     *
     * @param {Warehouse} warehouse - warehouse entity to insert
     * @param {string} unitId - unit id to insert warehouse with
     */
    insertWarehouse(warehouse: Warehouse, unitId: string) {
        return this.db.execSQL(`INSERT INTO warehouse (id, name, id_parent, id_unit) VALUES (?, ?, ?, ?)`,
            [warehouse.ID, warehouse.DisplayName, warehouse.ID_WarehouseMain, unitId])
            .then(id => {
                    // console.log("insert warehouse result", id);
                }, () => {
                    this.db.execSQL(`UPDATE warehouse SET id_unit = ${unitId} WHERE id = ${warehouse.ID}`)
                        .then(id => {
                            }, error => {
                                console.log("updating warehouse record error", error)
                            }
                        )
                }
            )
    }

    /**
     * Method to insert warehouseItem into database. Synced parameter is always set to true.
     * It is set to false after inventory.
     * Boolean params in_warehouse and synced are represented by integer values 0,1 (false, true)
     *
     * @param {WarehouseItem} item to be inserted
     */
    insertItem(item: WarehouseItem) {
        return this.db.execSQL(
            `INSERT OR IGNORE INTO item (
                id,
                name,
                id_warehouse,
                inventory_number,
                description,
                purchase_price,
                in_warehouse,
                purchase_date,
                inventory_date,
                photo_content,
                synced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                item.ID,
                item.DisplayName,
                item.ID_Warehouse,
                item.InventoryNumber,
                item.Description,
                item.PurchasePrice,
                item.InWarehouse ? 1 : 0,
                item.PurchaseDate,
                item.InventoryDate,
                item.PhotoContent,
                item.synced ? 1 : 0
            ])
            .then(() => {
                },
                error => {
                    console.log("insert into item error", error)
                }
            )
    }

    updateItemPhoto(item: WarehouseItem) {
        return this.db.execSQL(`UPDATE item SET photo_content = '${item.PhotoContent}' WHERE id = ${item.ID}`)
            .then(() => {
                console.log('success updating item photo')
                },
                error => {
                    console.log("error updating item photo: " + error)
                })
    }

    /**
     * Method to select all available warehouses for current role. It maps each row to warehouse entity.
     *
     * @param {string} unitId - id of the unit which warehouses we want to select
     * @returns {Array<Warehouse>} - array of available warehouses
     */
    selectAvailableWarehouses(unitId: string) {
        let result = [];
        return this.db.each(`SELECT * FROM warehouse WHERE id_unit = ${unitId}`, (err, row) => {
            result.push(this.createWarehouseObject(new Warehouse(), row))
        })
            .then(() => {
                return new Promise((resolve, reject) => {
                    if (result.length > 0) {
                        result.sort((item1, item2) => {
                            return item1.DisplayName.localeCompare(item2.DisplayName, undefined, {
                                numeric: true,
                                sensitivity:'base'
                            });
                        })
                    }
                    resolve(result);
                })
            })
    }

    /**
     * Method to select all available items for specified warehouse. Maps each row to warehouseItem entity.
     *
     * @param {string} warehouseId - id of selected warehouse
     * @returns {Array<WarehouseItem>} - array of available warehouse items
     */
    selectAvailableItems(warehouseId: string) {
        let result = [];
        return this.db.each(`SELECT * FROM item WHERE id_warehouse = ${warehouseId}`, (err, row) => {
            result.push(this.createItemObject(new WarehouseItem(), row))
        })
            .then(() => {
                return new Promise((resolve, reject) => {
                    if (result.length > 0) {
                        result.sort((item1, item2) => {
                            return item1.DisplayName.localeCompare(item2.DisplayName, undefined, {
                                numeric: true,
                                sensitivity: 'base'
                            });
                        })
                    }
                    resolve(result);
                })
            })
    }

    private createWarehouseObject(warehouse: Warehouse, dbRow: Array<any>): Warehouse {
        warehouse.ID = dbRow[0];
        warehouse.DisplayName = dbRow[1];
        warehouse.ID_WarehouseMain = dbRow[2];
        warehouse.ID_Unit = dbRow[3];
        return warehouse
    }

    private createItemObject(item: WarehouseItem, dbRow: Array<any>): WarehouseItem {
        item.ID = dbRow[0];
        item.DisplayName = dbRow[1];
        item.ID_Warehouse = dbRow[2];
        item.InventoryNumber = dbRow[3];
        item.Description = dbRow[4];
        item.PurchasePrice = dbRow[5];
        item.InWarehouse = dbRow[6] === 1;
        item.PurchaseDate = dbRow[7];
        item.InventoryDate = dbRow[8];
        item.PhotoContent = dbRow[9];
        item.synced = dbRow[10] === 1;
        item.setImageSource();
        return item
    }
}
