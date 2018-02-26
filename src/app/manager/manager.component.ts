import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { SeatsManagerService, SimpleSeatsManagerService } from '../welcome/seats-manager/seats-manager.service';
import { ISeats } from '../welcome/seats-manager/ISeats';
import { ISeat } from '../welcome/seats-manager/ISeat';

@Component({
    selector: 'manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.less'],
    providers: [
        { provide: SeatsManagerService, useClass: SimpleSeatsManagerService }
    ]
})
export class ManagerComponent implements OnInit {
    public invitedState: ISeats;
    public displayedColumns: string[];
    public dataSource: MatTableDataSource<ISeat>;
    public amountArrived: number = 0;

    constructor(public SimpleSeatsManagerService: SeatsManagerService) { }

    ngOnInit() {
        this.loadTable();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public loadTable() {
        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.invitedState = data;
            this.displayedColumns = ['name', 'tableNumber', 'amount', 'hasArrived'];
            this.dataSource = new MatTableDataSource(this.invitedState.guests);
            this.amountArrived = 0;
            this.invitedState.guests.forEach(element => {
                if (element.hasArrived){
                    this.amountArrived += element.amount;
                }
            });
        }, data => {
            console.log(data);
        });
    }

    public updateTable() {
        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.invitedState = data;
            (<any>document.getElementById('table')).renderRows();
        }, data => {
            console.log(data);
        });
    }
}

