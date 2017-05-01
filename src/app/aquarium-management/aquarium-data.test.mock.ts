import { EicKeyName, EicCrudListData } from "../library/index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

/**
 * Implements the crud operation of a aquarium domain for mock test
 */
@Injectable()
@EicKeyName("id")
export class AquariumDataTestMock implements EicCrudListData {

    getAll() {

        return Observable.of<any[]>([
                {id: "1", name: "Aquario 1"},
                {id: "2", name: "Aquario 2"},
                {id: "3", name: "Aquario 3s"},
                {id: "4", name: "Aquario 4"},
                {id: "5", name: "Aquario 5"},
                {id: "6", name: "Aquario 6"},
                {id: "7", name: "Aquario 7"},
                {id: "8", name: "Aquario 8"},
                {id: "9", name: "Aquario 9"},
                {id: "10", name: "Aquario 10"},
                {id: "11", name: "Aquario 11"},
                {id: "12", name: "Aquario 12"},
                {id: "13", name: "Aquario 13"},
                {id: "14", name: "Aquario 14"},
                {id: "15", name: "Aquario 15"},
                {id: "16", name: "Aquario 16"},
                {id: "17", name: "Aquario 17"},
            ]);
    }
}
