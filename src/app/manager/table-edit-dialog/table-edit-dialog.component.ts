import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'table-edit-dialog',
    templateUrl: 'table-edit-dialog.html',
})
export class TableEditDialog {
    private previousTable: number;

    constructor(
        public dialogRef: MatDialogRef<TableEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.previousTable = data.element.tableNumber;
        }

    onNoClick(): void {
        this.data.element.tableNumber = this.previousTable;
        this.dialogRef.close();
    }

}