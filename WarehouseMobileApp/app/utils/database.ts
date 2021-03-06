import { Injectable } from "@angular/core";
import { WarehouseItem } from "../entities/warehouseItem/warehouseItem";
import { Warehouse } from "../entities/warehouse/warehouse";
import { Inventory } from "../entities/inventory/inventory";
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
                id_unit TEXT)`)
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
                        last_inventory_id TEXT,
                        FOREIGN KEY(id_warehouse) REFERENCES warehouse(id))`)
                    .then(() => {
                            this.db.execSQL(`
                                CREATE TABLE IF NOT EXISTS inventory (
                                    id TEXT PRIMARY KEY,
                                    name TEXT,
                                    date TEXT,
                                    warehouses TEXT)`)
                                .then(() => {
                                        console.log("All tables creates successfully")
                                    },
                                    error => {
                                        console.log("create table inventory error", error)
                                    })
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
     * Method to insert row into inventory table
     *
     * @param {Inventory} inventory - inventory entity to insert
     */
    insertInventory(inventory: Inventory) {
        return this.db.execSQL(`INSERT OR IGNORE INTO inventory (id, name, date, warehouses)
            VALUES (?, ?, ?, ?)`,
            [inventory.ID, inventory.DisplayName, inventory.Date, inventory.Warehouses.toString()])
            .then(id => {
                },
                error => {
                    console.log("error inserting into inventory", error);
                })
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
                synced,
                last_inventory_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
                item.synced ? 1 : 0,
                item.lastInventoryId
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

    updateItemLastInventoryId(item: WarehouseItem) {
        const inventoryId = item.lastInventoryId ? item.lastInventoryId : "-1";
        return this.db.execSQL(`UPDATE item SET last_inventory_id = '${inventoryId}' WHERE id = ${item.ID}`)
            .then(() => {
                },
                error => {
                    console.log("error updating lastInventoryId: " + error);
                })
    }

    updateItemSynced(item: WarehouseItem) {
        const synced = item.synced ? 1 : 0;
        return this.db.execSQL(`UPDATE item SET synced = '${synced}' WHERE id = ${item.ID}`)
            .then(() => {
                },
                error => {
                    console.log("error updating item synced: " + error);
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

    selectAvailableInventories() {
        let result = [];
        return this.db.each(`SELECT * FROM inventory`, (err, row) => {
            result.push(this.createInventoryObject(new Inventory(), row))
        })
            .then(() => {
                return new Promise((resolve, reject) => {
                    resolve(result);
                })
            })
    }

    /**
     * Method to select current warehouse from db.
     *
     * @param {string} warehouseId
     */
    selectSingleWarehouse(warehouseId: string) {
        let result = null;
        return this.db.each(`SELECT * FROM warehouse WHERE id = ${warehouseId}`, (err, row) => {
            result = this.createWarehouseObject(new Warehouse(), row);
        })
            .then(() => {
                return new Promise((resolve, reject) => {
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

    private createInventoryObject(inventory: Inventory, dbRow: Array<any>): Inventory {
        inventory.ID = dbRow[0];
        inventory.DisplayName = dbRow[1];
        inventory.Date = dbRow[2];
        inventory.Warehouses = dbRow[3];
        return inventory
    }

    /**
     * Method creates WarehouseItem object with data from db. It also parses ISO date to dd/mm/yyyy format.
     *
     * @param {WarehouseItem} item - object to fill with data
     * @param {Array<any>} dbRow - db row containing data
     * @returns {WarehouseItem} - returned composed object
     */
    private createItemObject(item: WarehouseItem, dbRow: Array<any>): WarehouseItem {
        item.ID = dbRow[0];
        item.DisplayName = dbRow[1];
        item.ID_Warehouse = dbRow[2];
        item.InventoryNumber = dbRow[3];
        item.Description = dbRow[4];
        item.PurchasePrice = dbRow[5];
        item.InWarehouse = dbRow[6] === 1;
        if (dbRow[7]) {
            let dateTmp = new Date(Date.parse(dbRow[7]));
            item.PurchaseDate = this.pad(dateTmp.getDate())+"/"+this.pad(dateTmp.getMonth()+1)+"/"+dateTmp.getFullYear();
        }
        else {
            item.PurchaseDate = dbRow[7];
        }
        if (dbRow[8]) {
            let dateTmp = new Date(Date.parse(dbRow[8]));
            item.InventoryDate = this.pad(dateTmp.getDate())+"/"+this.pad(dateTmp.getMonth()+1)+"/"+dateTmp.getFullYear();
        }
        else {
            item.InventoryDate = dbRow[8];
        }
        item.PhotoContent = dbRow[9];
        item.synced = dbRow[10] === 1;
        item.lastInventoryId = (dbRow[11] === "-1") ? null : dbRow[11];
        item.setImageSource();
        return item
    }

    /**
     * Stack overflow function to help format date
     *
     * @param n
     * @returns {string}
     */
    private pad(n) {
        return n < 10 ? "0"+n : n;
    }
}

