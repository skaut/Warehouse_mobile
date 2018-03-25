import { USER_TOKEN, USER_ROLE_ID, USER_UNIT_ID } from "../../constants";
import { Status } from "../../utils/enums";
import * as XmlObjects from "nativescript-xmlobjects";
import * as AppSettings from "application-settings";


/**
 * Function parses received response to login request and saves token, roleId and unitId to AppSettings
 *
 * @param {string} response - received data as xml string
 * @returns {Status} - success if there were no problems, error otherwise
 */
export const parseLoginResponse = (response: string): Status => {
    try {
        const inputs = XmlObjects.parse(response)
            .root
            .element("body")
            .element("form")
            .elements("input");
        inputs.map((element) => {
            switch (element.attribute("name").value) {
                case "skautIS_Token":
                    AppSettings.setString(USER_TOKEN, element.attribute("value").value);
                    break;
                case "skautIS_IDRole":
                    AppSettings.setString(USER_ROLE_ID, element.attribute("value").value);
                    break;
                case "skautIS_IDUnit":
                    AppSettings.setString(USER_UNIT_ID, element.attribute("value").value);
                    break;
            }
        });
        return Status.success
    }
    catch {
        return Status.error;
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
export const parseSoapResponse = (response: string, entity: any, createSingleOutputEntity?: () => any): any => {
    try {
        const entityName = entity.constructor.name;
        const requestName = entityName.split("Result")[0];
        // receivedTags contains XElement either directly encapsulating received data (e.g. above <ID>1234</ID>)
        // or XElement encapsulating Output tags (e.g. above <UserRoleAllOutput>)
        const receivedTags = XmlObjects.parse(response)
            .root
            .element("soap:Body")
            .element(`${requestName}Response`)
            .element(`${entityName}`);
        const outputs = receivedTags.elements(`${requestName}Output`);
        if (outputs.length === 0) {
            return mapReceivedDataToEntity(entity, receivedTags.nodes())
        }
        else {
            outputs.map(output => {
                const mappingEntity = mapReceivedDataToEntity(createSingleOutputEntity(), output.nodes());
                entity[`${mappingEntity.constructor.name}s`].push(mappingEntity);
            });
            return entity
        }
    }
    catch {
        return null
    }
};

/**
 * Function maps received data to corresponding fields of provided entity
 *
 * @param entity - entity to map received data to
 * @param {XNode[]} nodes - received data in XML object
 */
const mapReceivedDataToEntity = (entity: any, nodes: XmlObjects.XNode[]): any => {
    const properties = Object.getOwnPropertyNames(entity);
    nodes.map(tag => {
        if (tag instanceof XmlObjects.XElement) {
            properties.map(property => {
                if (property === tag.name.toString()) {
                    entity[property] = tag.value.toString()
                }
            })
        }
    });
    return entity
};
