"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var AppSettings = require("application-settings");
var UserDetailResult = /** @class */ (function () {
    function UserDetailResult() {
        this.ID = "";
        this.ID_Person = "";
        this.Person = "";
    }
    UserDetailResult.prototype.saveData = function () {
        AppSettings.setString(constants_1.USER_ID, this.ID);
        AppSettings.setString(constants_1.USER_PERSON_ID, this.ID_Person);
        AppSettings.setString(constants_1.USER_PERSON_NAME, this.Person);
    };
    UserDetailResult.prototype.toString = function () {
        return "ID: " + this.ID + ", ID_Person: " + this.ID_Person + ", Person: " + this.Person;
    };
    return UserDetailResult;
}());
exports.UserDetailResult = UserDetailResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckRldGFpbFJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJEZXRhaWxSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNEU7QUFDNUUsa0RBQW9EO0FBR3BEO0lBS0k7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksV0FBVyxDQUFDLFNBQVMsQ0FBQyxtQkFBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxXQUFXLENBQUMsU0FBUyxDQUFDLDBCQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELFdBQVcsQ0FBQyxTQUFTLENBQUMsNEJBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQzNGLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVVNFUl9JRCwgVVNFUl9QRVJTT05fSUQsIFVTRVJfUEVSU09OX05BTUUgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCAqIGFzIEFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyRGV0YWlsUmVzdWx0IHtcclxuICAgIElEOiBzdHJpbmc7XHJcbiAgICBJRF9QZXJzb246IHN0cmluZztcclxuICAgIFBlcnNvbjogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuSUQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuSURfUGVyc29uID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBlcnNvbiA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZURhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgQXBwU2V0dGluZ3Muc2V0U3RyaW5nKFVTRVJfSUQsIHRoaXMuSUQpO1xyXG4gICAgICAgIEFwcFNldHRpbmdzLnNldFN0cmluZyhVU0VSX1BFUlNPTl9JRCwgdGhpcy5JRF9QZXJzb24pO1xyXG4gICAgICAgIEFwcFNldHRpbmdzLnNldFN0cmluZyhVU0VSX1BFUlNPTl9OQU1FLCB0aGlzLlBlcnNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJJRDogXCIgKyB0aGlzLklEICsgXCIsIElEX1BlcnNvbjogXCIgKyB0aGlzLklEX1BlcnNvbiArIFwiLCBQZXJzb246IFwiICsgdGhpcy5QZXJzb25cclxuICAgIH1cclxufVxyXG4iXX0=