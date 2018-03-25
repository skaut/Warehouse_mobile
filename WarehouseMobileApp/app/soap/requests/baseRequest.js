"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var constants_1 = require("../../constants");
var core_1 = require("@angular/core");
var functions_1 = require("../../utils/functions");
var AppSettings = require("application-settings");
var Constants = require("../../constants");
var BaseRequest = /** @class */ (function () {
    function BaseRequest() {
        this.ID_Application = constants_1.APPLICATION_ID;
        this.ID_Login = AppSettings.getString(constants_1.USER_TOKEN, "");
    }
    /**
     * Method for post call on skautIS webservice
     *
     * @param entity object used to get required parameters and xml tags names
     * @param {string} serviceName to call on backend api
     * @returns {Observable<any>} result of post request
     */
    BaseRequest.prototype.call = function (entity, serviceName, httpClient) {
        // const entityName = entity.constructor.name;
        var options = {
            headers: new http_1.HttpHeaders({
                "Content-Type": "text/xml",
            }),
            responseType: "text"
        };
        return httpClient.post(Constants.BASE_SERVICE_URL + serviceName + ".asmx", this.getBody(entity, entity.constructor.name), options);
    };
    BaseRequest.prototype.getBody = function (entity, entityName) {
        var requestParams = Object.getOwnPropertyNames(entity)
            .map(function (element) { return "<" + element + ">" + entity[element] + "</" + element + ">"; });
        return "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n                  <soap12:Body>\n                    <" + entityName + " xmlns=\"https://is.skaut.cz/\">\n                      <" + functions_1.lowerCaseFirstLetter(entityName) + "Input>\n                        " + requestParams.join('') + "\n                      </" + functions_1.lowerCaseFirstLetter(entityName) + "Input>\n                    </" + entityName + ">\n                  </soap12:Body>\n                </soap12:Envelope>";
    };
    BaseRequest = __decorate([
        core_1.Injectable()
    ], BaseRequest);
    return BaseRequest;
}());
exports.BaseRequest = BaseRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUErRDtBQUUvRCw2Q0FBNkQ7QUFDN0Qsc0NBQTJDO0FBQzNDLG1EQUE2RDtBQUM3RCxrREFBbUQ7QUFDbkQsMkNBQTZDO0FBSTdDO0lBREE7UUFHSSxtQkFBYyxHQUFXLDBCQUFjLENBQUM7UUFDeEMsYUFBUSxHQUFXLFdBQVcsQ0FBQyxTQUFTLENBQUMsc0JBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQXNDN0QsQ0FBQztJQXBDRzs7Ozs7O09BTUc7SUFDSCwwQkFBSSxHQUFKLFVBQUssTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBc0I7UUFDekQsOENBQThDO1FBQzlDLElBQU0sT0FBTyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUksa0JBQVcsQ0FBQztnQkFDckIsY0FBYyxFQUFFLFVBQVU7YUFFN0IsQ0FBQztZQUNGLFlBQVksRUFBRSxNQUFnQjtTQUNqQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2xCLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLEdBQUcsT0FBTyxFQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUM3QyxPQUFPLENBQ1YsQ0FBQztJQUNOLENBQUM7SUFFTyw2QkFBTyxHQUFmLFVBQWdCLE1BQVcsRUFBRSxVQUFrQjtRQUMzQyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO2FBQ25ELEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE1BQUksT0FBTyxTQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBSyxPQUFPLE1BQUcsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyw4T0FFUSxVQUFVLGlFQUNSLGdDQUFvQixDQUFDLFVBQVUsQ0FBQyx3Q0FDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0NBQ3RCLGdDQUFvQixDQUFDLFVBQVUsQ0FBQyxzQ0FDbEMsVUFBVSw0RUFFQyxDQUFDO0lBQ2hDLENBQUM7SUF4Q1EsV0FBVztRQUR2QixpQkFBVSxFQUFFO09BQ0EsV0FBVyxDQXlDdkI7SUFBRCxrQkFBQztDQUFBLEFBekNELElBeUNDO0FBekNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgVVNFUl9UT0tFTiwgQVBQTElDQVRJT05fSUQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBsb3dlckNhc2VGaXJzdExldHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9mdW5jdGlvbnNcIjtcclxuaW1wb3J0ICogYXMgQXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCJcclxuaW1wb3J0ICogYXMgQ29uc3RhbnRzIGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdCB7XHJcblxyXG4gICAgSURfQXBwbGljYXRpb246IHN0cmluZyA9IEFQUExJQ0FUSU9OX0lEO1xyXG4gICAgSURfTG9naW46IHN0cmluZyA9IEFwcFNldHRpbmdzLmdldFN0cmluZyhVU0VSX1RPS0VOLCBcIlwiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCBmb3IgcG9zdCBjYWxsIG9uIHNrYXV0SVMgd2Vic2VydmljZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgb2JqZWN0IHVzZWQgdG8gZ2V0IHJlcXVpcmVkIHBhcmFtZXRlcnMgYW5kIHhtbCB0YWdzIG5hbWVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VydmljZU5hbWUgdG8gY2FsbCBvbiBiYWNrZW5kIGFwaVxyXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn0gcmVzdWx0IG9mIHBvc3QgcmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBjYWxsKGVudGl0eTogYW55LCBzZXJ2aWNlTmFtZTogc3RyaW5nLCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvLyBjb25zdCBlbnRpdHlOYW1lID0gZW50aXR5LmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC94bWxcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiU09BUEFjdGlvblwiOiBgaHR0cHM6Ly9pcy5za2F1dC5jei8ke2VudGl0eU5hbWV9YFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiBcInRleHRcIiBhcyBcInRleHRcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGh0dHBDbGllbnQucG9zdChcclxuICAgICAgICAgICAgQ29uc3RhbnRzLkJBU0VfU0VSVklDRV9VUkwgKyBzZXJ2aWNlTmFtZSArIFwiLmFzbXhcIixcclxuICAgICAgICAgICAgdGhpcy5nZXRCb2R5KGVudGl0eSwgZW50aXR5LmNvbnN0cnVjdG9yLm5hbWUpLFxyXG4gICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvZHkoZW50aXR5OiBhbnksIGVudGl0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbnRpdHkpXHJcbiAgICAgICAgICAgIC5tYXAoZWxlbWVudCA9PiBgPCR7ZWxlbWVudH0+JHtlbnRpdHlbZWxlbWVudF19PC8ke2VsZW1lbnR9PmApO1xyXG4gICAgICAgIHJldHVybiBgPHNvYXAxMjpFbnZlbG9wZSB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhtbG5zOnhzZD1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXCIgeG1sbnM6c29hcDEyPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMy8wNS9zb2FwLWVudmVsb3BlXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzb2FwMTI6Qm9keT5cclxuICAgICAgICAgICAgICAgICAgICA8JHtlbnRpdHlOYW1lfSB4bWxucz1cImh0dHBzOi8vaXMuc2thdXQuY3ovXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8JHtsb3dlckNhc2VGaXJzdExldHRlcihlbnRpdHlOYW1lKX1JbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXF1ZXN0UGFyYW1zLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC8ke2xvd2VyQ2FzZUZpcnN0TGV0dGVyKGVudGl0eU5hbWUpfUlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvJHtlbnRpdHlOYW1lfT5cclxuICAgICAgICAgICAgICAgICAgPC9zb2FwMTI6Qm9keT5cclxuICAgICAgICAgICAgICAgIDwvc29hcDEyOkVudmVsb3BlPmA7XHJcbiAgICB9XHJcbn0iXX0=