import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { SeatsManagerService, SimpleSeatsManagerService } from '../welcome/seats-manager/seats-manager.service';
import { ISeats } from '../welcome/seats-manager/ISeats';
import { ISeat } from '../welcome/seats-manager/ISeat';
import { TableEditDialog } from './table-edit-dialog/table-edit-dialog.component';
import { element } from 'protractor';
import { Router } from '@angular/router';

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
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(public SimpleSeatsManagerService: SeatsManagerService,
        public dialog: MatDialog,
        private router: Router) { }

    ngOnInit() {
        this.loadTable();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    editField(field: string, editValue: string, el: any) {
        let idx = this.dataSource.data.findIndex(ele => el.name == ele.name);
        this.dataSource.data[idx][field] = editValue;
    }

    public goTableView() {
        this.router.navigate(['manager/tables-view']);
    }

    
    public goTotalTableView() {
        this.router.navigate(['manager/forDaria']);
    }    

    public loadTable() {
        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.invitedState = data;
            this.displayedColumns = ['name', 'tableNumber', 'amount', 'hasArrived', 'relation'];
            this.dataSource = new MatTableDataSource(this.invitedState.guests);
            this.dataSource.sort = this.sort;
            this.amountArrived = 0;
            this.invitedState.guests.forEach(element => {
                if (element.hasArrived) {
                    this.amountArrived += element.amount;
                }
            });
        }, data => {
            console.log(data);
        });
    }

    openEditDialog(field: string, editValue: string, el: any): void {
        let dialogRef = this.dialog.open(TableEditDialog, {
            width: '250px',
            data: { field: field, editValue: editValue, element: el },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result === undefined || result === null) {
                return;
            }
            let idx = this.dataSource.data.findIndex(ele => el.name == ele.name);

            if (field === 'tableNumber') {
                this.dataSource.data[idx][field] = result.tableNumber;
                this.SimpleSeatsManagerService.setTable(el.name, el.tableNumber);
            } else if (field === 'hasArrived') {
                this.amountArrived += result.hasArrived ? -result.amount : result.amount;
                this.dataSource.data[idx][field] = !result.hasArrived
                this.SimpleSeatsManagerService.setHasArrived(el.name, el.hasArrived);
            }
        });
    }
}

