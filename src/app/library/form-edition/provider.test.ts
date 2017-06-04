import { EicNavControllerMock, EicNavParamsMock } from "../mock";

import { Form, NavController, NavParams } from "ionic-angular";

export const EIC_PROVIDER_TEST_EDITION_CONTROLLER = [
    Form,
    {provide: NavController, useValue: EicNavControllerMock},
    {provide: NavParams, useValue: EicNavParamsMock}
];
