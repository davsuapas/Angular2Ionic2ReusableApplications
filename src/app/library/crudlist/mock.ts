import {EicNavControllerMock} from '../mock';
import { EicCrudListController } from "./crudlist-controller";
import { EicCrudListContainer } from "./crudlist-container";

export const EicCrudListControllerMock: EicCrudListController =
 jasmine.createSpyObj("EicCrudListController", ["navAddItem", "navEditItem"]);

export const eicCrudListContainerMock: EicCrudListContainer = new EicCrudListContainer(EicNavControllerMock);
eicCrudListContainerMock.parent = EicCrudListControllerMock;

export const EicListMock = jasmine.createSpyObj("List", ["enableSlidingItems", "closeSlidingItems", "containsSlidingItem"]);
 
