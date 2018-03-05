import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatsManagerService, SimpleSeatsManagerService } from '../../welcome/seats-manager/seats-manager.service';
import { ISeats } from '../../welcome/seats-manager/ISeats';
import { MatTableDataSource } from '@angular/material';
import { ISeat } from '../../welcome/seats-manager/ISeat';

@Component({
    selector: 'app-tables-view',
    templateUrl: './tables-view.component.html',
    styleUrls: ['./tables-view.component.less'],
    providers: [
        { provide: SeatsManagerService, useClass: SimpleSeatsManagerService }
    ]
})
export class TablesViewComponent implements OnInit {

    amountArrived: number;
    dataSource: MatTableDataSource<ISeat>;
    displayedColumns: string[];
    invitedState: ISeats;
    constructor(private router: Router,
        public SimpleSeatsManagerService: SeatsManagerService, ) {
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
        this.invitedState = data;
        this.displayedColumns = ['tableNumber', 'name', 'amount', 'hasArrived'];
        this.dataSource = new MatTableDataSource<ISeat>(this.invitedState.guests);
        this.dataSource.filterPredicate = this.tableFilter;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        this.amountArrived = 0;
        if (filterValue === "") {
            return;
        }
        this.dataSource.filteredData.forEach((row: ISeat) => {
            this.amountArrived += row.hasArrived ? row.amount : 0;
        })
    }

    tableFilter(data: ISeat, filter: string): boolean {
        return data.tableNumber == Number(filter);
    }

}
