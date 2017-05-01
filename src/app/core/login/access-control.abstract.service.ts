import {UserContext} from '../contexts/user-context';

export abstract class AccessControlService {
    abstract CheckIn(): Promise<UserContext>
}