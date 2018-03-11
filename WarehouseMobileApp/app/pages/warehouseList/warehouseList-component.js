"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var classes_1 = require("../../utils/classes");
var page_1 = require("ui/page");
var WarehouseListComponent = /** @class */ (function () {
    function WarehouseListComponent(page, helper) {
        this.page = page;
        this.helper = helper;
        this.warehouses = [];
        this.isLoading = true;
        this.listLoaded = false;
    }
    WarehouseListComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.warehouses.push({ name: "Warehouse 1" });
        this.warehouses.push({ name: "Warehouse 2" });
        this.warehouses.push({ name: "Warehouse 3" });
    };
    WarehouseListComponent.prototype.logout = function () {
        this.helper.logout();
    };
    WarehouseListComponent.prototype.warehouseSelected = function () {
        this.helper.navigate("/warehouseDetail");
    };
    WarehouseListComponent = __decorate([
        core_1.Component({
            selector: "warehouseList-component",
            moduleId: module.id,
            templateUrl: "./warehouseList.html",
            styleUrls: ["./warehouseList-common.css"],
            providers: [classes_1.Helper]
        }),
        __metadata("design:paramtypes", [page_1.Page, classes_1.Helper])
    ], WarehouseListComponent);
    return WarehouseListComponent;
}());
exports.WarehouseListComponent = WarehouseListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyZWhvdXNlTGlzdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXJlaG91c2VMaXN0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrQ0FBNEM7QUFDNUMsZ0NBQStCO0FBVS9CO0lBS0ksZ0NBQXFCLElBQVUsRUFBVSxNQUFjO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSnZELGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBQy9CLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUV3QyxDQUFDO0lBRTVELHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELHVDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxrREFBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFwQlEsc0JBQXNCO1FBUmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLGdCQUFNLENBQUM7U0FDdEIsQ0FBQzt5Q0FPNkIsV0FBSSxFQUFrQixnQkFBTTtPQUw5QyxzQkFBc0IsQ0FxQmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXJCRCxJQXFCQztBQXJCWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc2VzXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIndhcmVob3VzZUxpc3QtY29tcG9uZW50XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi93YXJlaG91c2VMaXN0Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi93YXJlaG91c2VMaXN0LWNvbW1vbi5jc3NcIl0sXHJcbiAgICBwcm92aWRlcnM6IFtIZWxwZXJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgV2FyZWhvdXNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB3YXJlaG91c2VzOiBBcnJheTxPYmplY3Q+ID0gW107XHJcbiAgICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgaGVscGVyOiBIZWxwZXIgKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKHsgbmFtZTogXCJXYXJlaG91c2UgMVwiIH0pO1xyXG4gICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKHsgbmFtZTogXCJXYXJlaG91c2UgMlwiIH0pO1xyXG4gICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKHsgbmFtZTogXCJXYXJlaG91c2UgM1wiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgICB0aGlzLmhlbHBlci5sb2dvdXQoKVxyXG4gICAgfVxyXG5cclxuICAgIHdhcmVob3VzZVNlbGVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuaGVscGVyLm5hdmlnYXRlKFwiL3dhcmVob3VzZURldGFpbFwiKVxyXG4gICAgfVxyXG59Il19