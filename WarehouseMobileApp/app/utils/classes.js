"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var dialogs = require("tns-core-modules/ui/dialogs");
var Helper = /** @class */ (function () {
    function Helper(routerExtensions) {
        this.routerExtensions = routerExtensions;
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
                _this.routerExtensions.navigate([""], { clearHistory: true });
            }
        });
    };
    Helper.prototype.navigate = function (page) {
        this.routerExtensions.navigate([page]);
    };
    Helper = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions])
    ], Helper);
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkRBQXdEO0FBQ3hELHFEQUF1RDtBQUl2RDtJQUNJLGdCQUFxQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFFNUQsdUJBQU0sR0FBTjtRQUFBLGlCQVlDO1FBWEcsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUNaLEtBQUssRUFBRSxXQUFXO1lBQ2xCLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN6QixDQUFDO2FBQ0csSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVELHlCQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQW5CUSxNQUFNO1FBRGxCLGlCQUFVLEVBQUU7eUNBRThCLHVDQUFnQjtPQUQ5QyxNQUFNLENBb0JsQjtJQUFELGFBQUM7Q0FBQSxBQXBCRCxJQW9CQztBQXBCWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zICkge31cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiT2RobMOhxaFlbsOtXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiT3ByYXZkdSBzZSBjaGNldGUgb2RobMOhc2l0P1wiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQU5PXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTkVcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlKHBhZ2UpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3BhZ2VdKTtcclxuICAgIH1cclxufSJdfQ==