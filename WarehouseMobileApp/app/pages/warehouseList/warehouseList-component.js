"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WarehouseListComponent = /** @class */ (function () {
    function WarehouseListComponent() {
        this.warehouses = [];
        this.isLoading = true;
        this.listLoaded = false;
    }
    WarehouseListComponent.prototype.ngOnInit = function () {
        this.warehouses.push({ name: "Warehouse 1" });
        this.warehouses.push({ name: "Warehouse 2" });
        this.warehouses.push({ name: "Warehouse 3" });
    };
    WarehouseListComponent = __decorate([
        core_1.Component({
            selector: "warehouseList-component",
            moduleId: module.id,
            templateUrl: "./warehouseList.html",
            styleUrls: ["./warehouseList-common.css"],
        }),
        __metadata("design:paramtypes", [])
    ], WarehouseListComponent);
    return WarehouseListComponent;
}());
exports.WarehouseListComponent = WarehouseListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyZWhvdXNlTGlzdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXJlaG91c2VMaXN0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQVFsRDtJQUtJO1FBSkEsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFDL0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO0lBRUosQ0FBQztJQUVoQix5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQVhRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDOztPQUNXLHNCQUFzQixDQVlsQztJQUFELDZCQUFDO0NBQUEsQUFaRCxJQVlDO0FBWlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ3YXJlaG91c2VMaXN0LWNvbXBvbmVudFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vd2FyZWhvdXNlTGlzdC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vd2FyZWhvdXNlTGlzdC1jb21tb24uY3NzXCJdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2FyZWhvdXNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB3YXJlaG91c2VzOiBBcnJheTxPYmplY3Q+ID0gW107XHJcbiAgICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh7IG5hbWU6IFwiV2FyZWhvdXNlIDFcIiB9KTtcclxuICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh7IG5hbWU6IFwiV2FyZWhvdXNlIDJcIiB9KTtcclxuICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh7IG5hbWU6IFwiV2FyZWhvdXNlIDNcIiB9KTtcclxuICAgIH1cclxufSJdfQ==