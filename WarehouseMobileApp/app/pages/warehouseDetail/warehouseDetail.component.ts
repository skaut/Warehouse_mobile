import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as Camera from "nativescript-camera"
import * as ImageSource from "tns-core-modules/image-source";


@Component({
    selector: "warehouseDetail-component",
    moduleId: module.id,
    templateUrl: "./warehouseDetail.html",
    styleUrls: ["./warehouseDetail.common.css"],
    providers: [],
})

export class WarehouseDetailComponent implements OnInit {
    items: ObservableArray<WarehouseItem>;
    warehouseId: string;
    listLoaded: boolean;
    icons: {};

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private database: Database)
    {
        this.listLoaded = false;
        this.route.queryParams.subscribe(params => {
            this.warehouseId = params["warehouseId"];
        });
        this.icons = {
            caretLeft: String.fromCharCode(0xea44),
            caretDown: String.fromCharCode(0xea43),
            info: String.fromCharCode(0xea0c),
            photo: String.fromCharCode(0xe90f),
        }
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.items = this.database.selectAvailableItems(this.warehouseId)
            .then((items) => {
                setTimeout(() => {
                    console.log("loading items from db");
                    this.items = new ObservableArray<WarehouseItem>(items);
                    this.listLoaded = true;
                }, 900);
            });
    }

    onItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        dataItem.expanded = !dataItem.expanded;
    }

    onImageTap(eventData) {
        const dataItem = eventData.view.bindingContext;
        if (!dataItem.photo) {
            if (Camera.isAvailable()) {
                Camera.requestPermissions();
                Camera.takePicture({width: 300, height: 300, keepAspectRatio: true, saveToGallery: false})
                    .then(imageAsset => {
                        ImageSource.fromAsset(imageAsset).then(imageSource => {
                            dataItem.photo = imageSource;
                            dataItem.PhotoContent = imageSource.toBase64String("jpeg", 100);
                            this.database.updateItemPhoto(dataItem);
                        })
                    })
            }
        }
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}