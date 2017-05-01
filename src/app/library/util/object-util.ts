/**
 * Tools for objects
 */
export class EicObjectUtil {

    /**
     * Iterate for object properties
     * @param {any} object
     * @param expression callback (propertyName, value)
     */
    static forEachProperties(object: any, expression: (string, any?) => void ) {

        for (const propertyName in object) {

            if (object.hasOwnProperty(propertyName)) {
                expression(propertyName, object[propertyName]);
            }
        }
    }
}
