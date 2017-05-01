import {UserContext} from './user-context';
import { ContextStorageService } from "./context-storage.abstract.service";

export class ContextStorageTestMock extends ContextStorageService {

    private readonly userContext: UserContext = 
        {
            profileId: "profileId",
            securityToken: "securityToken"
        };
    
    init(): Promise<any> {
        return Promise.resolve(this.userContext);
    }
    getUser(): Promise<UserContext> {
        return Promise.resolve(this.userContext);
    }
    saveUser(context: UserContext): Promise<any> {
        return Promise.resolve(this.userContext);
    }
}