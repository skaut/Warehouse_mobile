"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XmlObjects = require("nativescript-xmlobjects");
var AppSettings = require("application-settings");
/**
 * Function parses received response to login request and saves token, roleId and unitId to AppSettings
 *
 * @param {string} response - received data as xml string
 * @returns {Status} - success if there were no problems, error otherwise
 */
exports.parseLoginResponse = function (response) {
    try {
        var inputs = XmlObjects.parse(response)
            .root
            .element("body")
            .element("form")
            .elements("input");
        inputs.map(function (element) {
            switch (element.attribute("name").value) {
                case "skautIS_Token":
                    AppSettings.setString("token", element.attribute("value").value);
                    break;
                case "skautIS_IDRole":
                    AppSettings.setString("roleId", element.attribute("value").value);
                    break;
                case "skautIS_IDUnit":
                    AppSettings.setString("unitId", element.attribute("value").value);
                    break;
            }
        });
        // console.log(AppSettings.getString("token"));
        // console.log(AppSettings.getString("roleId"));
        // console.log(AppSettings.getString("unitId"));
        return 0 /* success */;
    }
    catch (_a) {
        return 1 /* error */;
    }
};
/**
 * Function parses received soap response to fields of entity parameter
 *
 * @param {string} response - soap response as string
 * @param entity - result entity to map received parameters to. In case of multiple outputs in result
 *  (e.g. response to UserRoleAll) entity object must have list parameter of entities to map results to with name
 *  in this format - UserRoles: Array<UserRole>() (or Warehouses: Array<Warehouse>());
 * @param createSingleOutputEntity - function to create entity object to map single output to
 */
exports.parseSoapResponse = function (response, entity, createSingleOutputEntity) {
    try {
        var entityName = entity.constructor.name;
        var requestName = entityName.split("Result")[0];
        // receivedTags contains XElement either directly encapsulating received data (e.g. above <ID>1234</ID>)
        // or XElement encapsulating Output tags (e.g. above <UserRoleAllOutput>)
        var receivedTags = XmlObjects.parse(response)
            .root
            .element("soap:Body")
            .element(requestName + "Response")
            .element("" + entityName);
        var outputs = receivedTags.elements(requestName + "Output");
        if (outputs.length === 0) {
            return mapReceivedDataToEntity(entity, receivedTags.nodes());
        }
        else {
            if (!createSingleOutputEntity()) {
                return 1 /* error */;
            }
            outputs.map(function (output) {
                var mappingEntity = mapReceivedDataToEntity(createSingleOutputEntity(), output.nodes());
                entity[mappingEntity.constructor.name + "s"].push(mappingEntity);
            });
            return entity;
        }
    }
    catch (_a) {
        return 1 /* error */;
    }
};
/**
 * Function maps received data to corresponding fields of provided entity
 *
 * @param entity - entity to map received data to
 * @param {XNode[]} nodes - received data in XML object
 */
var mapReceivedDataToEntity = function (entity, nodes) {
    var properties = Object.getOwnPropertyNames(entity);
    nodes.map(function (tag) {
        if (tag instanceof XmlObjects.XElement) {
            properties.map(function (property) {
                if (property === tag.name.toString()) {
                    entity[property] = tag.value.toString();
                }
            });
        }
    });
    return entity;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VQYXJzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzcG9uc2VQYXJzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esb0RBQXNEO0FBQ3RELGtEQUFvRDtBQUdwRDs7Ozs7R0FLRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsVUFBQyxRQUFnQjtJQUMvQyxJQUFJLENBQUM7UUFDRCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNwQyxJQUFJO2FBQ0osT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDZixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU87WUFDZixNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssZUFBZTtvQkFDaEIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakUsS0FBSyxDQUFDO2dCQUNWLEtBQUssZ0JBQWdCO29CQUNqQixXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRSxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxnQkFBZ0I7b0JBQ2pCLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xFLEtBQUssQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILCtDQUErQztRQUMvQyxnREFBZ0Q7UUFDaEQsZ0RBQWdEO1FBQ2hELE1BQU0saUJBQWU7SUFDekIsQ0FBQztJQUNELEtBQUssQ0FBQyxDQUFDLElBQUQsQ0FBQztRQUNILE1BQU0sZUFBYztJQUN4QixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBR0Y7Ozs7Ozs7O0dBUUc7QUFDVSxRQUFBLGlCQUFpQixHQUFHLFVBQUMsUUFBZ0IsRUFBRSxNQUFXLEVBQUUsd0JBQW9DO0lBQ2pHLElBQUksQ0FBQztRQUNELElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsd0dBQXdHO1FBQ3hHLHlFQUF5RTtRQUN6RSxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUMxQyxJQUFJO2FBQ0osT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUNwQixPQUFPLENBQUksV0FBVyxhQUFVLENBQUM7YUFDakMsT0FBTyxDQUFDLEtBQUcsVUFBWSxDQUFDLENBQUM7UUFDOUIsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBSSxXQUFXLFdBQVEsQ0FBQyxDQUFDO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hFLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sZUFBYTtZQUN2QixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07Z0JBQ2QsSUFBTSxhQUFhLEdBQUcsdUJBQXVCLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDMUYsTUFBTSxDQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxNQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQ0QsS0FBSyxDQUFDLENBQUMsSUFBRCxDQUFDO1FBQ0gsTUFBTSxlQUFhO0lBQ3ZCLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILElBQU0sdUJBQXVCLEdBQUcsVUFBQyxNQUFXLEVBQUUsS0FBeUI7SUFDbkUsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1FBQ1QsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO2dCQUNuQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUMzQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuLi8uLi91dGlscy9lbnVtc1wiO1xyXG5pbXBvcnQgKiBhcyBYbWxPYmplY3RzIGZyb20gXCJuYXRpdmVzY3JpcHQteG1sb2JqZWN0c1wiO1xyXG5pbXBvcnQgKiBhcyBBcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gcGFyc2VzIHJlY2VpdmVkIHJlc3BvbnNlIHRvIGxvZ2luIHJlcXVlc3QgYW5kIHNhdmVzIHRva2VuLCByb2xlSWQgYW5kIHVuaXRJZCB0byBBcHBTZXR0aW5nc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2UgLSByZWNlaXZlZCBkYXRhIGFzIHhtbCBzdHJpbmdcclxuICogQHJldHVybnMge1N0YXR1c30gLSBzdWNjZXNzIGlmIHRoZXJlIHdlcmUgbm8gcHJvYmxlbXMsIGVycm9yIG90aGVyd2lzZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHBhcnNlTG9naW5SZXNwb25zZSA9IChyZXNwb25zZTogc3RyaW5nKTogU3RhdHVzID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRzID0gWG1sT2JqZWN0cy5wYXJzZShyZXNwb25zZSlcclxuICAgICAgICAgICAgLnJvb3RcclxuICAgICAgICAgICAgLmVsZW1lbnQoXCJib2R5XCIpXHJcbiAgICAgICAgICAgIC5lbGVtZW50KFwiZm9ybVwiKVxyXG4gICAgICAgICAgICAuZWxlbWVudHMoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dHMubWFwKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZWxlbWVudC5hdHRyaWJ1dGUoXCJuYW1lXCIpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2thdXRJU19Ub2tlblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIEFwcFNldHRpbmdzLnNldFN0cmluZyhcInRva2VuXCIsIGVsZW1lbnQuYXR0cmlidXRlKFwidmFsdWVcIikudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNrYXV0SVNfSURSb2xlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwicm9sZUlkXCIsIGVsZW1lbnQuYXR0cmlidXRlKFwidmFsdWVcIikudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNrYXV0SVNfSURVbml0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidW5pdElkXCIsIGVsZW1lbnQuYXR0cmlidXRlKFwidmFsdWVcIikudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coQXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIikpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEFwcFNldHRpbmdzLmdldFN0cmluZyhcInJvbGVJZFwiKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coQXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidW5pdElkXCIpKTtcclxuICAgICAgICByZXR1cm4gU3RhdHVzLnN1Y2Nlc3NcclxuICAgIH1cclxuICAgIGNhdGNoIHtcclxuICAgICAgICByZXR1cm4gU3RhdHVzLmVycm9yO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiBwYXJzZXMgcmVjZWl2ZWQgc29hcCByZXNwb25zZSB0byBmaWVsZHMgb2YgZW50aXR5IHBhcmFtZXRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2UgLSBzb2FwIHJlc3BvbnNlIGFzIHN0cmluZ1xyXG4gKiBAcGFyYW0gZW50aXR5IC0gcmVzdWx0IGVudGl0eSB0byBtYXAgcmVjZWl2ZWQgcGFyYW1ldGVycyB0by4gSW4gY2FzZSBvZiBtdWx0aXBsZSBvdXRwdXRzIGluIHJlc3VsdFxyXG4gKiAgKGUuZy4gcmVzcG9uc2UgdG8gVXNlclJvbGVBbGwpIGVudGl0eSBvYmplY3QgbXVzdCBoYXZlIGxpc3QgcGFyYW1ldGVyIG9mIGVudGl0aWVzIHRvIG1hcCByZXN1bHRzIHRvIHdpdGggbmFtZVxyXG4gKiAgaW4gdGhpcyBmb3JtYXQgLSBVc2VyUm9sZXM6IEFycmF5PFVzZXJSb2xlPigpIChvciBXYXJlaG91c2VzOiBBcnJheTxXYXJlaG91c2U+KCkpO1xyXG4gKiBAcGFyYW0gY3JlYXRlU2luZ2xlT3V0cHV0RW50aXR5IC0gZnVuY3Rpb24gdG8gY3JlYXRlIGVudGl0eSBvYmplY3QgdG8gbWFwIHNpbmdsZSBvdXRwdXQgdG9cclxuICovXHJcbmV4cG9ydCBjb25zdCBwYXJzZVNvYXBSZXNwb25zZSA9IChyZXNwb25zZTogc3RyaW5nLCBlbnRpdHk6IGFueSwgY3JlYXRlU2luZ2xlT3V0cHV0RW50aXR5PzogKCkgPT4gYW55KTogYW55ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZW50aXR5TmFtZSA9IGVudGl0eS5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3ROYW1lID0gZW50aXR5TmFtZS5zcGxpdChcIlJlc3VsdFwiKVswXTtcclxuICAgICAgICAvLyByZWNlaXZlZFRhZ3MgY29udGFpbnMgWEVsZW1lbnQgZWl0aGVyIGRpcmVjdGx5IGVuY2Fwc3VsYXRpbmcgcmVjZWl2ZWQgZGF0YSAoZS5nLiBhYm92ZSA8SUQ+MTIzNDwvSUQ+KVxyXG4gICAgICAgIC8vIG9yIFhFbGVtZW50IGVuY2Fwc3VsYXRpbmcgT3V0cHV0IHRhZ3MgKGUuZy4gYWJvdmUgPFVzZXJSb2xlQWxsT3V0cHV0PilcclxuICAgICAgICBjb25zdCByZWNlaXZlZFRhZ3MgPSBYbWxPYmplY3RzLnBhcnNlKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAucm9vdFxyXG4gICAgICAgICAgICAuZWxlbWVudChcInNvYXA6Qm9keVwiKVxyXG4gICAgICAgICAgICAuZWxlbWVudChgJHtyZXF1ZXN0TmFtZX1SZXNwb25zZWApXHJcbiAgICAgICAgICAgIC5lbGVtZW50KGAke2VudGl0eU5hbWV9YCk7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0cyA9IHJlY2VpdmVkVGFncy5lbGVtZW50cyhgJHtyZXF1ZXN0TmFtZX1PdXRwdXRgKTtcclxuICAgICAgICBpZiAob3V0cHV0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFJlY2VpdmVkRGF0YVRvRW50aXR5KGVudGl0eSwgcmVjZWl2ZWRUYWdzLm5vZGVzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWNyZWF0ZVNpbmdsZU91dHB1dEVudGl0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLmVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0cy5tYXAob3V0cHV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBpbmdFbnRpdHkgPSBtYXBSZWNlaXZlZERhdGFUb0VudGl0eShjcmVhdGVTaW5nbGVPdXRwdXRFbnRpdHkoKSwgb3V0cHV0Lm5vZGVzKCkpO1xyXG4gICAgICAgICAgICAgICAgZW50aXR5W2Ake21hcHBpbmdFbnRpdHkuY29uc3RydWN0b3IubmFtZX1zYF0ucHVzaChtYXBwaW5nRW50aXR5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCB7XHJcbiAgICAgICAgcmV0dXJuIFN0YXR1cy5lcnJvclxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIG1hcHMgcmVjZWl2ZWQgZGF0YSB0byBjb3JyZXNwb25kaW5nIGZpZWxkcyBvZiBwcm92aWRlZCBlbnRpdHlcclxuICpcclxuICogQHBhcmFtIGVudGl0eSAtIGVudGl0eSB0byBtYXAgcmVjZWl2ZWQgZGF0YSB0b1xyXG4gKiBAcGFyYW0ge1hOb2RlW119IG5vZGVzIC0gcmVjZWl2ZWQgZGF0YSBpbiBYTUwgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBtYXBSZWNlaXZlZERhdGFUb0VudGl0eSA9IChlbnRpdHk6IGFueSwgbm9kZXM6IFhtbE9iamVjdHMuWE5vZGVbXSk6IGFueSA9PiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZW50aXR5KTtcclxuICAgIG5vZGVzLm1hcCh0YWcgPT4ge1xyXG4gICAgICAgIGlmICh0YWcgaW5zdGFuY2VvZiBYbWxPYmplY3RzLlhFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMubWFwKHByb3BlcnR5ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gdGFnLm5hbWUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVtwcm9wZXJ0eV0gPSB0YWcudmFsdWUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVudGl0eVxyXG59O1xyXG4iXX0=