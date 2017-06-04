import {EicEditionControllerOperation} from './edition-controller-operation';

export const EicEditionControllerOperationMock: EicEditionControllerOperation = jasmine.createSpyObj("EditionControllerOperation", ["accept"]);

export class EicMockEditionControllerContainer {
    get editionController(): EicEditionControllerOperation {
        return EicEditionControllerOperationMock;
    }
}