import {EicCrudListEditionOperation} from './crudlist-edition-operation';
import {EicNavControllerMock} from '../mock';
import { EicCrudListController } from "./crudlist-controller";
import { EicCrudListContainer } from "./crudlist-container";

export const EicCrudListControllerMock: EicCrudListController =
 jasmine.createSpyObj("EicCrudListController", ["navAddItem", "navEditItem"]);

export const eicCrudListContainerMock: EicCrudListContainer = new EicCrudListContainer(EicNavControllerMock);
eicCrudListContainerMock.parent = EicCrudListControllerMock;

export const EicListMock = jasmine.createSpyObj("List", ["enableSlidingItems", "closeSlidingItems", "containsSlidingItem"]);

export const EicCrudListEditionOperationMock: EicCrudListEditionOperation = jasmine.createSpyObj("EicCrudListEditionOperation", ["addItem", "updateItem"]);
 
