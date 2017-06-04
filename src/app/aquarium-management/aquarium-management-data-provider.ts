import {EicEditionData} from '../library/form-edition/edition-data';
import {EicCrudListData} from '../library/crudlist/crudlist-data';

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

export abstract class AquariumManagementDataProvider implements EicCrudListData, EicEditionData {
    abstract getById(id: any): Observable<any>;
    abstract save(entity: any): Observable<any>;
    abstract getAll(): Observable<any[]>;
}