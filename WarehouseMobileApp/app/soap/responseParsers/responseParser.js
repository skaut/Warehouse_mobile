"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XmlObjects = require("nativescript-xmlobjects");
var LoginResponse = /** @class */ (function () {
    function LoginResponse() {
        this.error = false;
    }
    /*
        Method parses xml response for login request and sets fields to received values.
        In case of error sets error field to true to signalize problem.
     */
    LoginResponse.prototype.parseLoginResponse = function (response) {
        var _this = this;
        try {
            var inputs = XmlObjects.parse(response)
                .root
                .element("body")
                .element("form")
                .elements("input");
            inputs.map(function (element) {
                switch (element.attribute("name").value) {
                    case "skautIS_Token":
                        _this.token = element.attribute("value").value;
                        break;
                    case "skautIS_IDRole":
                        _this.roleId = element.attribute("value").value;
                        break;
                    case "skautIS_IDUnit":
                        _this.unitId = element.attribute("value").value;
                        break;
                }
            });
        }
        catch (_a) {
            this.error = true;
        }
    };
    LoginResponse.prototype.getToken = function () {
        return this.token;
    };
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
var SoapResponse = /** @class */ (function () {
    function SoapResponse() {
    }
    return SoapResponse;
}());
exports.SoapResponse = SoapResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNwb25zZVBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFzRDtBQUd0RDtJQU1JO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILDBDQUFrQixHQUFsQixVQUFtQixRQUFnQjtRQUFuQyxpQkF3QkM7UUF2QkcsSUFBSSxDQUFDO1lBQ0QsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7aUJBQ3BDLElBQUk7aUJBQ0osT0FBTyxDQUFDLE1BQU0sQ0FBQztpQkFDZixPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNmLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTztnQkFDZixNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEtBQUssZUFBZTt3QkFDaEIsS0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDOUMsS0FBSyxDQUFDO29CQUNWLEtBQUssZ0JBQWdCO3dCQUNqQixLQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUMvQyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxnQkFBZ0I7d0JBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQy9DLEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsSUFBRCxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQztBQTNDWSxzQ0FBYTtBQTZDMUI7SUFBQTtJQUVBLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBYbWxPYmplY3RzIGZyb20gXCJuYXRpdmVzY3JpcHQteG1sb2JqZWN0c1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpblJlc3BvbnNlIHtcclxuICAgIHByaXZhdGUgdG9rZW46IHN0cmluZztcclxuICAgIHJvbGVJZDogc3RyaW5nO1xyXG4gICAgdW5pdElkOiBzdHJpbmc7XHJcbiAgICBlcnJvcjogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBNZXRob2QgcGFyc2VzIHhtbCByZXNwb25zZSBmb3IgbG9naW4gcmVxdWVzdCBhbmQgc2V0cyBmaWVsZHMgdG8gcmVjZWl2ZWQgdmFsdWVzLlxyXG4gICAgICAgIEluIGNhc2Ugb2YgZXJyb3Igc2V0cyBlcnJvciBmaWVsZCB0byB0cnVlIHRvIHNpZ25hbGl6ZSBwcm9ibGVtLlxyXG4gICAgICovXHJcbiAgICBwYXJzZUxvZ2luUmVzcG9uc2UocmVzcG9uc2U6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0cyA9IFhtbE9iamVjdHMucGFyc2UocmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICAucm9vdFxyXG4gICAgICAgICAgICAgICAgLmVsZW1lbnQoXCJib2R5XCIpXHJcbiAgICAgICAgICAgICAgICAuZWxlbWVudChcImZvcm1cIilcclxuICAgICAgICAgICAgICAgIC5lbGVtZW50cyhcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBpbnB1dHMubWFwKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVsZW1lbnQuYXR0cmlidXRlKFwibmFtZVwiKS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJza2F1dElTX1Rva2VuXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSBlbGVtZW50LmF0dHJpYnV0ZShcInZhbHVlXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2thdXRJU19JRFJvbGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlSWQgPSBlbGVtZW50LmF0dHJpYnV0ZShcInZhbHVlXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2thdXRJU19JRFVuaXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bml0SWQgPSBlbGVtZW50LmF0dHJpYnV0ZShcInZhbHVlXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2gge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9rZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTb2FwUmVzcG9uc2Uge1xyXG5cclxufSJdfQ==