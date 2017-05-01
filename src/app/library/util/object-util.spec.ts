import {EicObjectUtil} from "./object-util";

describe('ObjectUtil', () => {

    it('Iterate into object and return name property and value in a callback', () => {

        const object = {
            prop1: 1
        };

        let propName = "";
        let val = 0;

        EicObjectUtil.forEachProperties(object, function(propertyName, value) {
            propName = propertyName;
            val = value;
        });

        expect(propName).toBe("prop1");
        expect(val).toBe(1);
    });
});
