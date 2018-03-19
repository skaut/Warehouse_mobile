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
        this.error = false;
    }
    /**
     * Method parses received soap response to fields of entity parameter
     *
     * @param {string} response - soap response as text
     * @param entity - result entity to map received parameters to. In case of multiple outputs in result
     *  (e.g. response to RoleAll) entity object should have list parameter of entities to map results to
     *  (e.g.) roles: Role[];
     * @param multipleResponsesDataEntity - entity to map single output to (e.g.) Role.
     */
    SoapResponse.prototype.parseResponse = function (response, entity, multipleResponsesDataEntity) {
        try {
            var properties_1 = Object.getOwnPropertyNames(entity);
            var entityName = entity.constructor.name;
            var requestName = entityName.split("Result")[0];
            // receivedTags contains XElement either directly above received parameters
            // or above Output tags (e.g. <RoleAllOutput>), depends on response type
            var receivedTags = XmlObjects.parse(response)
                .root
                .element("soap:Body")
                .element(requestName + "Response")
                .elements("" + entityName)[0];
            var outputs = receivedTags.elements(requestName + "Output");
            // response with single response object, maps some of the received data which will be required later
            // to corresponding properties of passed result entity
            if (outputs.length === 0) {
                receivedTags.nodes().map(function (tag) {
                    if (tag instanceof XmlObjects.XElement) {
                        properties_1.map(function (property) {
                            if (property === tag.name.toString()) {
                                entity[property] = tag.value.toString();
                                // console.log("property: " + property + ", value: " + tag.value.toString());
                            }
                        });
                    }
                });
            }
            else {
                // todo - handle multiple outputs responses
            }
            return entity;
        }
        catch (_a) {
            this.error = true;
            return null;
        }
    };
    return SoapResponse;
}());
exports.SoapResponse = SoapResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VQYXJzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzcG9uc2VQYXJzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQXNEO0FBR3REO0lBTUk7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMENBQWtCLEdBQWxCLFVBQW1CLFFBQWdCO1FBQW5DLGlCQXdCQztRQXZCRyxJQUFJLENBQUM7WUFDRCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztpQkFDcEMsSUFBSTtpQkFDSixPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQ2YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO2dCQUNmLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsS0FBSyxlQUFlO3dCQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUM5QyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxnQkFBZ0I7d0JBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDVixLQUFLLGdCQUFnQjt3QkFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDL0MsS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxJQUFELENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBM0NZLHNDQUFhO0FBNkMxQjtJQUdJO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUdEOzs7Ozs7OztPQVFHO0lBQ0gsb0NBQWEsR0FBYixVQUFjLFFBQWdCLEVBQUUsTUFBVyxFQUFFLDJCQUFpQztRQUMxRSxJQUFJLENBQUM7WUFDRCxJQUFNLFlBQVUsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDM0MsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCwyRUFBMkU7WUFDM0Usd0VBQXdFO1lBQ3hFLElBQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2lCQUMxQyxJQUFJO2lCQUNKLE9BQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3BCLE9BQU8sQ0FBSSxXQUFXLGFBQVUsQ0FBQztpQkFDakMsUUFBUSxDQUFDLEtBQUcsVUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBSSxXQUFXLFdBQVEsQ0FBQyxDQUFDO1lBQzlELG9HQUFvRztZQUNwRyxzREFBc0Q7WUFDdEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztvQkFDeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxZQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTs0QkFDbkIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUNuQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDeEMsNkVBQTZFOzRCQUNqRixDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBRUQsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsMkNBQTJDO1lBQy9DLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxJQUFELENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBdkRELElBdURDO0FBdkRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgWG1sT2JqZWN0cyBmcm9tIFwibmF0aXZlc2NyaXB0LXhtbG9iamVjdHNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5SZXNwb25zZSB7XHJcbiAgICBwcml2YXRlIHRva2VuOiBzdHJpbmc7XHJcbiAgICByb2xlSWQ6IHN0cmluZztcclxuICAgIHVuaXRJZDogc3RyaW5nO1xyXG4gICAgZXJyb3I6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgTWV0aG9kIHBhcnNlcyB4bWwgcmVzcG9uc2UgZm9yIGxvZ2luIHJlcXVlc3QgYW5kIHNldHMgZmllbGRzIHRvIHJlY2VpdmVkIHZhbHVlcy5cclxuICAgICAgICBJbiBjYXNlIG9mIGVycm9yIHNldHMgZXJyb3IgZmllbGQgdG8gdHJ1ZSB0byBzaWduYWxpemUgcHJvYmxlbS5cclxuICAgICAqL1xyXG4gICAgcGFyc2VMb2dpblJlc3BvbnNlKHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dHMgPSBYbWxPYmplY3RzLnBhcnNlKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgLnJvb3RcclxuICAgICAgICAgICAgICAgIC5lbGVtZW50KFwiYm9keVwiKVxyXG4gICAgICAgICAgICAgICAgLmVsZW1lbnQoXCJmb3JtXCIpXHJcbiAgICAgICAgICAgICAgICAuZWxlbWVudHMoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgaW5wdXRzLm1hcCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LmF0dHJpYnV0ZShcIm5hbWVcIikudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2thdXRJU19Ub2tlblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gZWxlbWVudC5hdHRyaWJ1dGUoXCJ2YWx1ZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNrYXV0SVNfSURSb2xlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUlkID0gZWxlbWVudC5hdHRyaWJ1dGUoXCJ2YWx1ZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNrYXV0SVNfSURVbml0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5pdElkID0gZWxlbWVudC5hdHRyaWJ1dGUoXCJ2YWx1ZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRva2VuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU29hcFJlc3BvbnNlIHtcclxuICAgIGVycm9yOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgcGFyc2VzIHJlY2VpdmVkIHNvYXAgcmVzcG9uc2UgdG8gZmllbGRzIG9mIGVudGl0eSBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2UgLSBzb2FwIHJlc3BvbnNlIGFzIHRleHRcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgLSByZXN1bHQgZW50aXR5IHRvIG1hcCByZWNlaXZlZCBwYXJhbWV0ZXJzIHRvLiBJbiBjYXNlIG9mIG11bHRpcGxlIG91dHB1dHMgaW4gcmVzdWx0XHJcbiAgICAgKiAgKGUuZy4gcmVzcG9uc2UgdG8gUm9sZUFsbCkgZW50aXR5IG9iamVjdCBzaG91bGQgaGF2ZSBsaXN0IHBhcmFtZXRlciBvZiBlbnRpdGllcyB0byBtYXAgcmVzdWx0cyB0b1xyXG4gICAgICogIChlLmcuKSByb2xlczogUm9sZVtdO1xyXG4gICAgICogQHBhcmFtIG11bHRpcGxlUmVzcG9uc2VzRGF0YUVudGl0eSAtIGVudGl0eSB0byBtYXAgc2luZ2xlIG91dHB1dCB0byAoZS5nLikgUm9sZS5cclxuICAgICAqL1xyXG4gICAgcGFyc2VSZXNwb25zZShyZXNwb25zZTogc3RyaW5nLCBlbnRpdHk6IGFueSwgbXVsdGlwbGVSZXNwb25zZXNEYXRhRW50aXR5PzogYW55KTogYW55IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZW50aXR5KTtcclxuICAgICAgICAgICAgY29uc3QgZW50aXR5TmFtZSA9IGVudGl0eS5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0TmFtZSA9IGVudGl0eU5hbWUuc3BsaXQoXCJSZXN1bHRcIilbMF07XHJcbiAgICAgICAgICAgIC8vIHJlY2VpdmVkVGFncyBjb250YWlucyBYRWxlbWVudCBlaXRoZXIgZGlyZWN0bHkgYWJvdmUgcmVjZWl2ZWQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAvLyBvciBhYm92ZSBPdXRwdXQgdGFncyAoZS5nLiA8Um9sZUFsbE91dHB1dD4pLCBkZXBlbmRzIG9uIHJlc3BvbnNlIHR5cGVcclxuICAgICAgICAgICAgY29uc3QgcmVjZWl2ZWRUYWdzID0gWG1sT2JqZWN0cy5wYXJzZShyZXNwb25zZSlcclxuICAgICAgICAgICAgICAgIC5yb290XHJcbiAgICAgICAgICAgICAgICAuZWxlbWVudChcInNvYXA6Qm9keVwiKVxyXG4gICAgICAgICAgICAgICAgLmVsZW1lbnQoYCR7cmVxdWVzdE5hbWV9UmVzcG9uc2VgKVxyXG4gICAgICAgICAgICAgICAgLmVsZW1lbnRzKGAke2VudGl0eU5hbWV9YClbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dHMgPSByZWNlaXZlZFRhZ3MuZWxlbWVudHMoYCR7cmVxdWVzdE5hbWV9T3V0cHV0YCk7XHJcbiAgICAgICAgICAgIC8vIHJlc3BvbnNlIHdpdGggc2luZ2xlIHJlc3BvbnNlIG9iamVjdCwgbWFwcyBzb21lIG9mIHRoZSByZWNlaXZlZCBkYXRhIHdoaWNoIHdpbGwgYmUgcmVxdWlyZWQgbGF0ZXJcclxuICAgICAgICAgICAgLy8gdG8gY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHBhc3NlZCByZXN1bHQgZW50aXR5XHJcbiAgICAgICAgICAgIGlmIChvdXRwdXRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWRUYWdzLm5vZGVzKCkubWFwKHRhZyAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWcgaW5zdGFuY2VvZiBYbWxPYmplY3RzLlhFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMubWFwKHByb3BlcnR5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gdGFnLm5hbWUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eVtwcm9wZXJ0eV0gPSB0YWcudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByb3BlcnR5OiBcIiArIHByb3BlcnR5ICsgXCIsIHZhbHVlOiBcIiArIHRhZy52YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVzcG9uc2Ugd2hpY2ggbWF5IGNvbnRhaW4gbXVsdGlwbGUgb3V0cHV0cyAoZS5nLiByZXNwb25zZSB0byBSb2xlQWxsIHJlcXVlc3QpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gdG9kbyAtIGhhbmRsZSBtdWx0aXBsZSBvdXRwdXRzIHJlc3BvbnNlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==