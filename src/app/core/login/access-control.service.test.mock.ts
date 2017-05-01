import {UserContext} from '../contexts/user-context';
import { AccessControlService } from "./access-control.abstract.service";

export class AccessControlTestMock extends AccessControlService {

    CheckIn(): Promise<UserContext> {
        return Promise.resolve(undefined);
    }
}