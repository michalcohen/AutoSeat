import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITable } from './ITable';
import { ITables } from './ITables';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export abstract class TablesManagerService {
    allTables: ITables;

    getTable: (tableNumber: number) => number
    init: () => void
    getData: () => Observable<ITables>
}

@Injectable()
export class SimpleTablesManagerService implements TablesManagerService {

    public allTables: ITables;

    constructor(private http: HttpClient) {
        this.allTables = { tables: [] };
    }

    public init(): void {
        this.getData().subscribe(data => {
            this.allTables.tables = data.tables;
        });
    }

    public getTable(tableNumber: number): number {
        let table: ITable = this.allTables.tables.find((table: ITable) => {
            return table.tableNumber === tableNumber;
        });
        if (!table) {
            window.alert(`no such table`);
            return -1;
        }
        return table.tableNumber;
    }

    public getData(): Observable<ITables> {
        return this.http.get<ITables>('../assets/datastore/tables.json');
    }
}
