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
                console.log("open db error", error);
            }
        )
    }

    private prepareTables(): void {
        this.db.execSQL("CREATE TABLE IF NOT EXISTS warehouse (id TEXT PRIMARY KEY, name TEXT, id_parent TEXT)")
            .then(() => {
                console.log("success creating warehouse table");
                this.db.execSQL(`CREATE TABLE IF NOT EXISTS item (
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
                            console.log("success creating item table");
                        },
                        error => {
                            console.log("create table item error", error);
                        })
            }, error => {
                console.log("create table warehouse error.", error);
            });
    }

    insertWarehouse(warehouse: Warehouse): void {
        this.db.execSQL(`INSERT OR IGNORE INTO warehouse (id, name, id_parent) VALUES (?, ?, ?)`,
            [warehouse.ID, warehouse.DisplayName, warehouse.ID_WarehouseMain])
            .then(id => {
                    // console.log("insert warehouse result", id);
                }, error => {
                    console.log("insert into warehouse error", error);
                }
            )
    }

    /**
     * Method to insert warehouseItem into database. Synced parameter is always set to true.
     * It is set to false after inventory.
     * Boolean params in_warehouse and synced are represented by integer values 0,1 (false, true)
     *
     * @param {WarehouseItem} item to insert
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
            [item.ID, item.DisplayName, item.ID_Warehouse, item.InventoryNumber, item.Description, item.PurchasePrice,
                in_warehouse, item.PurchaseDate, item.InventoryDate, 1])
            .then(id => {
                    // console.log("insert item result", id);
                }, error => {
                    console.log("insert into item error", error);
                }
            )
    }

    selectAll(table: string): void {
        this.db.all(`SELECT * FROM ${table}`)
            .then(rows => {
                    console.log(rows);
                }, error => {
                    console.log(`select from ${table} error`, error);
                }
            )
    }
}
