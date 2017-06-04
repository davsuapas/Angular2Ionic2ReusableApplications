import {Observable} from "rxjs/Observable";

/**
 * Define interface for data edition from {@link EicEditionController}.
 */
export interface EicEditionData {

    /**
     * To get a entity
     * @param {any} id of the entity
     * @return Must return a entity
     */
    getById(id): Observable<any>;

    /**
     * Save entity
     * @param {any} entity
     * @return Return the entity saved
     */
    save(entity: any): Observable<any>;
}
