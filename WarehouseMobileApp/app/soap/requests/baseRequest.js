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
        return "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n                  <soap12:Body>\n                    <" + entityName + " xmlns=\"https://is.skaut.cz/\">\n                      <" + functions_1.lowerCaseFirstLetter(entityName) + "Input>\n                        <ID_Login>" + AppSettings.getString(constants_1.USER_TOKEN) + "</ID_Login>\n                        " + requestParams.join('') + "\n                      </" + functions_1.lowerCaseFirstLetter(entityName) + "Input>\n                    </" + entityName + ">\n                  </soap12:Body>\n                </soap12:Envelope>";
    };
    BaseRequest = __decorate([
        core_1.Injectable()
    ], BaseRequest);
    return BaseRequest;
}());
exports.BaseRequest = BaseRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUErRDtBQUUvRCw2Q0FBNkQ7QUFDN0Qsc0NBQTJDO0FBQzNDLG1EQUE2RDtBQUM3RCxrREFBbUQ7QUFDbkQsMkNBQTZDO0FBSTdDO0lBREE7UUFHSSxtQkFBYyxHQUFXLDBCQUFjLENBQUM7SUF1QzVDLENBQUM7SUFyQ0c7Ozs7OztPQU1HO0lBQ0gsMEJBQUksR0FBSixVQUFLLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQXNCO1FBQ3pELDhDQUE4QztRQUM5QyxJQUFNLE9BQU8sR0FBRztZQUNaLE9BQU8sRUFBRSxJQUFJLGtCQUFXLENBQUM7Z0JBQ3JCLGNBQWMsRUFBRSxVQUFVO2FBRTdCLENBQUM7WUFDRixZQUFZLEVBQUUsTUFBZ0I7U0FDakMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQixTQUFTLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxHQUFHLE9BQU8sRUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFDN0MsT0FBTyxDQUNWLENBQUM7SUFDTixDQUFDO0lBRU8sNkJBQU8sR0FBZixVQUFnQixNQUFXLEVBQUUsVUFBa0I7UUFDM0MsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxNQUFJLE9BQU8sU0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUssT0FBTyxNQUFHLEVBQTdDLENBQTZDLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsOE9BRVEsVUFBVSxpRUFDUixnQ0FBb0IsQ0FBQyxVQUFVLENBQUMsa0RBQ3JCLFdBQVcsQ0FBQyxTQUFTLENBQUMsc0JBQVUsQ0FBQyw2Q0FDM0MsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0NBQ3RCLGdDQUFvQixDQUFDLFVBQVUsQ0FBQyxzQ0FDbEMsVUFBVSw0RUFFQyxDQUFDO0lBQ2hDLENBQUM7SUF4Q1EsV0FBVztRQUR2QixpQkFBVSxFQUFFO09BQ0EsV0FBVyxDQXlDdkI7SUFBRCxrQkFBQztDQUFBLEFBekNELElBeUNDO0FBekNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgVVNFUl9UT0tFTiwgQVBQTElDQVRJT05fSUQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBsb3dlckNhc2VGaXJzdExldHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9mdW5jdGlvbnNcIjtcclxuaW1wb3J0ICogYXMgQXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCJcclxuaW1wb3J0ICogYXMgQ29uc3RhbnRzIGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdCB7XHJcblxyXG4gICAgSURfQXBwbGljYXRpb246IHN0cmluZyA9IEFQUExJQ0FUSU9OX0lEO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kIGZvciBwb3N0IGNhbGwgb24gc2thdXRJUyB3ZWJzZXJ2aWNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBvYmplY3QgdXNlZCB0byBnZXQgcmVxdWlyZWQgcGFyYW1ldGVycyBhbmQgeG1sIHRhZ3MgbmFtZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJ2aWNlTmFtZSB0byBjYWxsIG9uIGJhY2tlbmQgYXBpXHJcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fSByZXN1bHQgb2YgcG9zdCByZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIGNhbGwoZW50aXR5OiBhbnksIHNlcnZpY2VOYW1lOiBzdHJpbmcsIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vIGNvbnN0IGVudGl0eU5hbWUgPSBlbnRpdHkuY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3htbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gXCJTT0FQQWN0aW9uXCI6IGBodHRwczovL2lzLnNrYXV0LmN6LyR7ZW50aXR5TmFtZX1gXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6IFwidGV4dFwiIGFzIFwidGV4dFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gaHR0cENsaWVudC5wb3N0KFxyXG4gICAgICAgICAgICBDb25zdGFudHMuQkFTRV9TRVJWSUNFX1VSTCArIHNlcnZpY2VOYW1lICsgXCIuYXNteFwiLFxyXG4gICAgICAgICAgICB0aGlzLmdldEJvZHkoZW50aXR5LCBlbnRpdHkuY29uc3RydWN0b3IubmFtZSksXHJcbiAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Qm9keShlbnRpdHk6IGFueSwgZW50aXR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVudGl0eSlcclxuICAgICAgICAgICAgLm1hcChlbGVtZW50ID0+IGA8JHtlbGVtZW50fT4ke2VudGl0eVtlbGVtZW50XX08LyR7ZWxlbWVudH0+YCk7XHJcbiAgICAgICAgcmV0dXJuIGA8c29hcDEyOkVudmVsb3BlIHhtbG5zOnhzaT1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXCIgeG1sbnM6eHNkPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWFcIiB4bWxuczpzb2FwMTI9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAzLzA1L3NvYXAtZW52ZWxvcGVcIj5cclxuICAgICAgICAgICAgICAgICAgPHNvYXAxMjpCb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDwke2VudGl0eU5hbWV9IHhtbG5zPVwiaHR0cHM6Ly9pcy5za2F1dC5jei9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwke2xvd2VyQ2FzZUZpcnN0TGV0dGVyKGVudGl0eU5hbWUpfUlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SURfTG9naW4+JHtBcHBTZXR0aW5ncy5nZXRTdHJpbmcoVVNFUl9UT0tFTil9PC9JRF9Mb2dpbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXF1ZXN0UGFyYW1zLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC8ke2xvd2VyQ2FzZUZpcnN0TGV0dGVyKGVudGl0eU5hbWUpfUlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvJHtlbnRpdHlOYW1lfT5cclxuICAgICAgICAgICAgICAgICAgPC9zb2FwMTI6Qm9keT5cclxuICAgICAgICAgICAgICAgIDwvc29hcDEyOkVudmVsb3BlPmA7XHJcbiAgICB9XHJcbn0iXX0=