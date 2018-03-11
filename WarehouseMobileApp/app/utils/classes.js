"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs = require("tns-core-modules/ui/dialogs");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var Helper = /** @class */ (function () {
    function Helper(router) {
        this.router = router;
    }
    Helper.prototype.logout = function () {
        var _this = this;
        dialogs.confirm({
            title: "Odhlášení",
            message: "Opravdu se chcete odhlásit?",
            okButtonText: "ANO",
            cancelButtonText: "NE",
        })
            .then(function (result) {
            if (result) {
                _this.router.navigate([""]);
            }
        });
    };
    Helper.prototype.navigate = function (page) {
        this.router.navigate([page]);
    };
    Helper = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], Helper);
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBdUQ7QUFDdkQsMENBQXlDO0FBQ3pDLHNDQUEyQztBQUczQztJQUNJLGdCQUFxQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFeEMsdUJBQU0sR0FBTjtRQUFBLGlCQVlDO1FBWEcsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUNaLEtBQUssRUFBRSxXQUFXO1lBQ2xCLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN6QixDQUFDO2FBQ0csSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFRCx5QkFBUSxHQUFSLFVBQVMsSUFBSTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBbkJRLE1BQU07UUFEbEIsaUJBQVUsRUFBRTt5Q0FFb0IsZUFBTTtPQUQxQixNQUFNLENBb0JsQjtJQUFELGFBQUM7Q0FBQSxBQXBCRCxJQW9CQztBQXBCWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHJvdXRlcjogUm91dGVyICkge31cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiT2RobMOhxaFlbsOtXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiT3ByYXZkdSBzZSBjaGNldGUgb2RobMOhc2l0P1wiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQU5PXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTkVcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGUocGFnZSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYWdlXSk7XHJcbiAgICB9XHJcbn0iXX0=