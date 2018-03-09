import { Component, OnInit, ViewChild } from '@angular/core';
import { TablesManagerService, SimpleTablesManagerService } from '../tables-manager.service';
import { ITables } from '../ITables';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ITable } from '../ITable';
import { Router } from '@angular/router';
import { SeatsManagerService, SimpleSeatsManagerService } from '../../welcome/seats-manager/seats-manager.service';
import { ISeats } from '../../welcome/seats-manager/ISeats';
import { ISeat } from '../../welcome/seats-manager/ISeat';

@Component({
    selector: 'app-for-daria',
    templateUrl: './for-daria.component.html',
    styleUrls: ['./for-daria.component.less'],
    providers: [
        { provide: SeatsManagerService, useClass: SimpleSeatsManagerService }
    ]
})
export class ForDariaComponent implements OnInit {

    tablesState: ITables;
    amountArrived: number;
    tablesDataSource: MatTableDataSource<ITable>;
    displayedColumns: string[];
    tablesDisplayedColumns: string[];
    @ViewChild(MatSort) sort: MatSort;
    constructor(private router: Router,
        public SimpleSeatsManagerService: SeatsManagerService //
    ) {
        this.amountArrived = 0;
    }

    ngOnInit() {
        this.loadTable();
    }

    public goTableView() {
        this.router.navigate(['manager']);
    }

    public loadTable() {
        if (this.SimpleSeatsManagerService.allSeats && this.SimpleSeatsManagerService.allSeats.guests.length !== 0) {
            this.initTable(this.SimpleSeatsManagerService.allSeats);
            return;
        }

        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.initTable(data);
        }, data => {
            console.log(data);
        });
    }

    private initTable(data: ISeats) {
        this.tablesState = this.convertToTables(data);
        this.displayedColumns = ['tableNumber', 'arrived', 'relation'];
        this.tablesDataSource = new MatTableDataSource<ITable>(this.tablesState.tables);
        this.tablesDataSource.sort = this.sort;
    }
    
    private convertToTables(data: ISeats): ITables {
        let tablesData: ITables = { "tables": [] };

        data.guests.map((guest: ISeat) => {
            let tableIndex = tablesData.tables.findIndex((table: ITable) => {
                return table.tableNumber == guest.tableNumber;
            });
            if (tableIndex == -1) {
                tablesData.tables.push({
                    tableNumber: guest.tableNumber,
                    relation: guest.relation,
                    arrived: guest.hasArrived ? guest.amount : 0
                });
                return;
            }
            tablesData.tables[tableIndex].arrived += guest.hasArrived ? guest.amount : 0;
        });

        return tablesData;
    }
}
