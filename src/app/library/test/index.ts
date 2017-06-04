// In future, the library will be export an other project,
// beacause i create the file index. In this way,
// copying the library folder, i can generate 
// easly the library in other project 

export {EicPlatformMock, EicNavControllerMock, EicClassMock}  from "../mock";
export {EIC_TEST_CORE_PROVIDERS}  from "../provider.test";

export {
    EIC_PROVIDER_TEST_CRUDLIST_ITEM,
    EIC_PROVIDER_TEST_CRUDLIST_CONTROLLER,
    EIC_PROVIDER_TEST_CRUDLIST,
    EIC_COMPONENT_TEST_CRUDLIST
} from "../crudlist/provider.test";

export {
    EIC_PROVIDER_TEST_EDITION_CONTROLLER,
} from "../form-edition/provider.test";

