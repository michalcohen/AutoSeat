import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ISeat } from "../../welcome/seats-manager/ISeat";

@Component({
    selector: 'table-edit-dialog',
    templateUrl: 'table-edit-dialog.html',
})
export class TableEditDialog {
    private previousElement: ISeat;

    constructor(
        public dialogRef: MatDialogRef<TableEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.previousElement = data.element;
        }

    onNoClick(): void {
        this.data.element = this.previousElement;
        this.dialogRef.close();
    }

}