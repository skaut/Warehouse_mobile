"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var classes_1 = require("../../utils/classes");
var page_1 = require("ui/page");
var WarehouseDetailComponent = /** @class */ (function () {
    function WarehouseDetailComponent(page, helper) {
        this.page = page;
        this.helper = helper;
        this.items = [];
        this.isLoading = true;
        this.listLoaded = false;
    }
    WarehouseDetailComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.items.push({ name: "Item 1", id: "MC12854132" });
        this.items.push({ name: "Item 2", id: "MC12854132" });
        this.items.push({ name: "Item 3", id: "MC12854132" });
        this.items.push({ name: "Item 4", id: "MC12854132" });
        this.items.push({ name: "Item 5", id: "MC12854132" });
        this.items.push({ name: "Item 6", id: "MC12854132" });
        this.items.push({ name: "Item 7", id: "MC12854132" });
        this.items.push({ name: "Item 8", id: "MC12854132" });
    };
    WarehouseDetailComponent.prototype.logout = function () {
        this.helper.logout();
    };
    WarehouseDetailComponent.prototype.back = function () {
        this.helper.navigate("/warehouseList");
    };
    WarehouseDetailComponent = __decorate([
        core_1.Component({
            selector: "warehouseDetail-component",
            moduleId: module.id,
            templateUrl: "./warehouseDetail.html",
            styleUrls: ["./warehouseDetail-common.css"],
            providers: [classes_1.Helper]
        }),
        __metadata("design:paramtypes", [page_1.Page, classes_1.Helper])
    ], WarehouseDetailComponent);
    return WarehouseDetailComponent;
}());
exports.WarehouseDetailComponent = WarehouseDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyZWhvdXNlRGV0YWlsLWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhcmVob3VzZURldGFpbC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsK0NBQTRDO0FBQzVDLGdDQUErQjtBQVUvQjtJQUtJLGtDQUFxQixJQUFVLEVBQVUsTUFBYztRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUp2RCxVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUMxQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFFdUMsQ0FBQztJQUUzRCwyQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELHlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3hCLENBQUM7SUFFRCx1Q0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBekJRLHdCQUF3QjtRQVJwQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztZQUMzQyxTQUFTLEVBQUUsQ0FBQyxnQkFBTSxDQUFDO1NBQ3RCLENBQUM7eUNBTzZCLFdBQUksRUFBa0IsZ0JBQU07T0FMOUMsd0JBQXdCLENBMEJwQztJQUFELCtCQUFDO0NBQUEsQUExQkQsSUEwQkM7QUExQlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3Nlc1wiXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ3YXJlaG91c2VEZXRhaWwtY29tcG9uZW50XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi93YXJlaG91c2VEZXRhaWwuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3dhcmVob3VzZURldGFpbC1jb21tb24uY3NzXCJdLFxyXG4gICAgcHJvdmlkZXJzOiBbSGVscGVyXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhcmVob3VzZURldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBpdGVtczogQXJyYXk8T2JqZWN0PiA9IFtdO1xyXG4gICAgaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIGxpc3RMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGhlbHBlcjogSGVscGVyKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7IG5hbWU6IFwiSXRlbSAxXCIsIGlkOiBcIk1DMTI4NTQxMzJcIiB9KTtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkl0ZW0gMlwiLCBpZDogXCJNQzEyODU0MTMyXCIgfSk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJJdGVtIDNcIiwgaWQ6IFwiTUMxMjg1NDEzMlwiIH0pO1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7IG5hbWU6IFwiSXRlbSA0XCIsIGlkOiBcIk1DMTI4NTQxMzJcIiB9KTtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkl0ZW0gNVwiLCBpZDogXCJNQzEyODU0MTMyXCIgfSk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsgbmFtZTogXCJJdGVtIDZcIiwgaWQ6IFwiTUMxMjg1NDEzMlwiIH0pO1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7IG5hbWU6IFwiSXRlbSA3XCIsIGlkOiBcIk1DMTI4NTQxMzJcIiB9KTtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goeyBuYW1lOiBcIkl0ZW0gOFwiLCBpZDogXCJNQzEyODU0MTMyXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHRoaXMuaGVscGVyLmxvZ291dCgpXHJcbiAgICB9XHJcblxyXG4gICAgYmFjaygpIHtcclxuICAgICAgICB0aGlzLmhlbHBlci5uYXZpZ2F0ZShcIi93YXJlaG91c2VMaXN0XCIpXHJcbiAgICB9XHJcbn0iXX0=