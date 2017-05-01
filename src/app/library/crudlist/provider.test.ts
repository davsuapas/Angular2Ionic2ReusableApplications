import {EicCrudListItemComponent} from './crudlist-item.component';
import {EicCrudListAddButtonComponent} from './crudlist-addbutton.component';
import {EicNavControllerMock} from '../mock';
import {EicListMock, eicCrudListContainerMock} from './mock';
import {EicCrudListContainer} from './crudlist-container';

import {NavController, List, Form} from 'ionic-angular';

export const EIC_PROVIDER_TEST_CRUDLIST_ITEM = [
        Form,
        {provide: EicCrudListContainer, useValue: eicCrudListContainerMock},
        {provide: List, useValue: EicListMock}
];

export const EIC_PROVIDER_TEST_CRUDLIST_CONTROLLER = [
    {provide: NavController, useValue: EicNavControllerMock}
];

export const EIC_PROVIDER_TEST_CRUDLIST = [
    EIC_PROVIDER_TEST_CRUDLIST_ITEM,
    EIC_PROVIDER_TEST_CRUDLIST_CONTROLLER
];

export const EIC_COMPONENT_TEST_CRUDLIST = [
    EicCrudListAddButtonComponent,
    EicCrudListItemComponent
];
