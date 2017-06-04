import {Observable} from "rxjs/Observable";

/**
 * Define interface for getting items from {@link EicCrudListController}.
 */
export interface EicCrudListData {

    /**
     * To get all from {@link EicCrudListController}.
     * Must return a array from the class {@link EicCrudListController}.
     */
    getAll(): Observable<any[]>;
}
