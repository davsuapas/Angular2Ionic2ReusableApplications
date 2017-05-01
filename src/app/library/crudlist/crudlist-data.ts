import {Observable} from "rxjs/Observable";

/**
 * Define interface for getting items from {@link EicCrudListController}.
 */
export abstract class EicCrudListData {

    /**
     * To get all from {@link EicCrudListController}.
     * Must return a array from the class {@link EicCrudListController}.
     */
    abstract getAll(): Observable<any[]>;
}
