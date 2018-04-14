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
     * @param {Warehouse} warehouse to be inserted
     */
    insertWarehouse(warehouse: Warehouse, unitId: string): void {
        this.db.execSQL(`INSERT INTO warehouse (id, name, id_parent, id_unit) VALUES (?, ?, ?, ?)`,
            [warehouse.ID, warehouse.DisplayName, warehouse.ID_WarehouseMain, unitId])
            .then(id => {
                    // console.log("insert warehouse result", id);
                }, () => {
                    this.db.execSQL(`UPDATE warehouse SET id_unit = ${unitId} WHERE ID = ${warehouse.ID}`)
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
    insertItem(item: WarehouseItem): void {
        const in_warehouse = (item.InWarehouse) ? 1 : 0;
        this.db.execSQL(
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
                synced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                item.ID,
                item.DisplayName,
                item.ID_Warehouse,
                item.InventoryNumber,
                item.Description,
                item.PurchasePrice,
                in_warehouse,
                item.PurchaseDate,
                item.InventoryDate,
                1
            ])
            .then(() => {
                },
                error => {
                    console.log("insert into item error", error)
                }
            )
    }

    /**
     * Method selects all from specified table (warehouse or item) and maps each row to corresponding entity
     *
     * @param {string} table - Table to perform the select on (warehouse or item tables)
     * @returns {Array<any>} - Array of entities with data mapped from db.
     */
    selectAll(table: string): Array<any> {
        let result = [];
        this.db.each(`SELECT * FROM ${table}`, (err, row) => {
            if (table === "warehouse") {
                result.push(this.createWarehouseObject(new Warehouse(), row));
            }
            else {
                result.push(this.createItemObject(new WarehouseItem(), row));
            }
        });
        // todo - remove this method
        return result
    }

    /**
     * Method to select all available warehouses for current role. It maps each row to warehouse entity.
     *
     * @param {string} unitId - id of the unit which warehouses we want to select
     * @returns {Array<Warehouse>} - array of available warehouses
     */
    selectAvailableWarehouses(unitId: string): Array<Warehouse> {
        let result = [];
        this.db.each(`SELECT * FROM warehouse WHERE id_unit = ${unitId}`, (err, row) => {
            result.push(this.createWarehouseObject(new Warehouse(), row))
        });
        return result
    }

    selectAvailableItems(warehouseId: string): Array<WarehouseItem> {
        let result = [];
        this.db.each(`SELECT * FROM item WHERE id_warehouse = ${warehouseId}`, (err, row) => {
            result.push(this.createItemObject(new WarehouseItem(), row))
        });
        return result
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
        item.InWarehouse = (dbRow[6] === 1);
        item.PurchaseDate = dbRow[7];
        item.InventoryDate = dbRow[8];
        return item
    }
}
