import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'table-edit-dialog',
    templateUrl: 'table-edit-dialog.html',
})
export class TableEditDialog {

    constructor(
        public dialogRef: MatDialogRef<TableEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}