import { Component } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { SeatsManagerService, SimpleSeatsManagerService } from '../welcome/seats-manager/seats-manager.service';
import { ISeats } from '../welcome/seats-manager/ISeats';
import { ISeat } from '../welcome/seats-manager/ISeat';
import { TableEditDialog } from './table-edit-dialog/table-edit-dialog.component';
import { element } from 'protractor';

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

    constructor(public SimpleSeatsManagerService: SeatsManagerService,
        public dialog: MatDialog) { }

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

    public loadTable() {
        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.invitedState = data;
            this.displayedColumns = ['name', 'tableNumber', 'amount', 'hasArrived'];
            this.dataSource = new MatTableDataSource(this.invitedState.guests);
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

    public updateTable() {
        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.invitedState = data;
            (<any>document.getElementById('table')).renderRows();
        }, data => {
            console.log(data);
        });
    }

    openEditDialog(field: string, editValue: string, el: any): void {
        let dialogRef = this.dialog.open(TableEditDialog, {
          width: '250px',
          data: { field: field, editValue: editValue, element: el }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if (result === undefined || result === null) {
              return;
          }
          let idx = this.dataSource.data.findIndex(ele => el.name == ele.name);
          this.dataSource.data[idx][field] = result;
          //TODO update server
        });
      }
}

