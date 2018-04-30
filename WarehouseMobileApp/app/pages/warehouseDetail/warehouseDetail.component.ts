import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { UserService } from "../../entities/user/user.service";
import { TempFileInsert } from "../../soap/requests/tempFileInsert";
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
    items: Array<WarehouseItem>;
    warehouseId: string;
    listLoaded: boolean;
    icons: {};

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private database: Database,
        private userService: UserService)
    {
        this.listLoaded = false;
        this.route.queryParams.subscribe(params => {
            this.warehouseId = params["warehouseId"];
        });
        this.items = [];
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
                    console.log("loading items from db - warehouse detail page");
                    this.items = items;
                    this.listLoaded = true;
                }, 700)
            });
    }

    onItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        // const date = new Date();
        // date.setHours(date.getHours() + 2);
        // let datis = date.toISOString();
        // console.log(date);
        // console.log(datis);
        // datis = datis.slice(0, datis.length - 1);
        // console.log(datis);
        // console.log(dataItem.ID);
        // console.log(dataItem.ID_Warehouse);
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
                            dataItem.PhotoContent = imageSource.toBase64String("jpeg", 90);
                            this.database.updateItemPhoto(dataItem);
                            // this.userService.insertPhotoTempFile(new TempFileInsert("jpeg",
                            //     new Uint8Array(10)))
                            //     .subscribe((resp) => {
                            //             console.log("winwin");
                            //             console.log(resp);
                            //         },
                            //         err => {
                            //             console.log(err.error);
                            //             console.log(err.message)
                            //         })
                        })
                    })
            }
        }
    }

    onInventoryTap() {
        this.routerExtensions.navigate(["/inventory"],
            {queryParams: {"warehouseId": this.warehouseId}})
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}