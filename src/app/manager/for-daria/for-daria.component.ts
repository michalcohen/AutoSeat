import { Component, OnInit } from '@angular/core';
import { TablesManagerService, SimpleTablesManagerService } from '../tables-manager.service';
import { ITables } from '../ITables';
import { MatTableDataSource } from '@angular/material';
import { ITable } from '../ITable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-daria',
  templateUrl: './for-daria.component.html',
  styleUrls: ['./for-daria.component.less'],
  providers: [
    { provide: TablesManagerService, useClass: SimpleTablesManagerService }
  ]
})
export class ForDariaComponent implements OnInit {

  tablesState: ITables;
  amountArrived: number;
  tablesDataSource: MatTableDataSource<ITable>;
  displayedColumns: string[];
  tablesDisplayedColumns: string[];
  constructor(private router: Router,
    public SimpleTablesManagerService: TablesManagerService //
  ) {
    this.amountArrived = 0;
  }

  ngOnInit() {
    this.loadTableOfTables();
  }

  public goTableView() {
    this.router.navigate(['manager']);
  }

  public loadTableOfTables() {
    if (this.SimpleTablesManagerService.allTables && this.SimpleTablesManagerService.allTables.tables.length !== 0) {
      this.initTableOfTables(this.SimpleTablesManagerService.allTables);
      return;
    }

    this.SimpleTablesManagerService.getData().subscribe(data => {
      this.initTableOfTables(data);
    }, data => {
      console.log(data);
    });

  }


  private initTableOfTables(data: ITables) {
    this.tablesState = data;
    this.displayedColumns = ['tableNumber', 'arrived', 'relation'];
    this.tablesDataSource = new MatTableDataSource<ITable>(this.tablesState.tables);
  }
}
