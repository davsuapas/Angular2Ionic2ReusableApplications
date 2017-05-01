import {UserContext} from './user-context';

export abstract class ContextStorageService {
    abstract init(): Promise<any>
    abstract getUser(): Promise<UserContext>
    abstract saveUser(context: UserContext): Promise<any>
}